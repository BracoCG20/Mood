import { useState, useEffect } from "react";
import CmsSidebar from "../../components/Cms/CmsSidebar";
import JobsTable from "../../components/Cms/JobsTable";
import JobForm from "../../components/Cms/JobForm";
import ApplicationsTable from "../../components/Cms/ApplicationsTable";
import UsersTable from "../../components/Cms/UsersTable";
import UserForm from "../../components/Cms/UserForm";
import Profile from "../../components/Cms/Profile"; // 🌟 Importamos el nuevo componente de Perfil
import { Plus } from "lucide-react";
import "./CmsDashboard.scss";

const CmsDashboard = () => {
	const [activeTab, setActiveTab] = useState(() => {
		return localStorage.getItem("cms_active_tab") || "vacantes";
	});
	useEffect(() => {
		localStorage.setItem("cms_active_tab", activeTab);
	}, [activeTab]);
	const [jobs, setJobs] = useState([]);
	const [applications, setApplications] = useState([]);
	const [users, setUsers] = useState([]);

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [jobToEdit, setJobToEdit] = useState(null);

	const [isUserFormOpen, setIsUserFormOpen] = useState(false);
	const [userToEdit, setUserToEdit] = useState(null);

	const fetchJobs = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/jobs");
			const data = await response.json();
			setJobs(data);
		} catch (error) {
			console.error("Error al cargar vacantes:", error);
		}
	};

	const fetchApplications = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/applications");
			const data = await response.json();
			setApplications(data);
		} catch (error) {
			console.error("Error al cargar postulaciones:", error);
		}
	};

	const fetchUsers = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/users");
			if (response.ok) {
				const data = await response.json();
				setUsers(data);
			}
		} catch (error) {
			console.error("Error al cargar usuarios:", error);
		}
	};

	useEffect(() => {
		if (activeTab === "vacantes") fetchJobs();
		if (activeTab === "postulantes") fetchApplications();
		if (activeTab === "configuracion") fetchUsers();
		// 🌟 No necesitamos hacer fetch si activeTab es 'perfil', porque usa el AuthContext
	}, [activeTab]);

	useEffect(() => {
		document.body.style.overflow = isFormOpen || isUserFormOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isFormOpen, isUserFormOpen]);

	const handleSuccess = () => {
		setIsFormOpen(false);
		fetchJobs();
	};

	const handleUserSuccess = () => {
		setIsUserFormOpen(false);
		fetchUsers();
	};

	const handleToggleStatus = async (jobId) => {
		const token = localStorage.getItem("cms_token");
		const isConfirmed = window.confirm(
			"¿Seguro que deseas cambiar el estado de esta vacante?",
		);
		if (!isConfirmed) return;

		try {
			const response = await fetch(
				`http://localhost:5000/api/jobs/${jobId}/status`,
				{
					method: "PATCH",
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			if (response.ok) fetchJobs();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const openCreateForm = () => {
		setJobToEdit(null);
		setIsFormOpen(true);
	};

	const openEditForm = async (jobShort) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/jobs/${jobShort.id}`,
			);
			const fullJob = await response.json();
			setJobToEdit(fullJob);
			setIsFormOpen(true);
		} catch (error) {
			console.error("Error al cargar detalles para edición:", error);
		}
	};

	const openCreateUserForm = () => {
		setUserToEdit(null);
		setIsUserFormOpen(true);
	};

	return (
		<div className='cms-layout'>
			<CmsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

			<main className='cms-main-content'>
				{/* 🌟 Ocultamos el header genérico si estamos en configuración O en perfil */}
				{activeTab !== "configuracion" && activeTab !== "perfil" && (
					<header className='cms-main-content__header'>
						<div>
							<h1>
								{activeTab === "vacantes"
									? "Gestión de Vacantes"
									: "Base de Postulantes"}
							</h1>
							<p>
								{activeTab === "vacantes"
									? "Administra los puestos de trabajo disponibles en la agencia."
									: "Revisa y descarga los perfiles de los talentos que han postulado."}
							</p>
						</div>

						{activeTab === "vacantes" && (
							<button className='cms-btn-primary' onClick={openCreateForm}>
								<Plus size={16} strokeWidth={3} /> Nueva Vacante
							</button>
						)}
					</header>
				)}

				{/* RENDERIZADO CONDICIONAL DE TABLAS Y VISTAS */}
				{activeTab === "vacantes" && (
					<JobsTable
						jobs={jobs}
						onToggleStatus={handleToggleStatus}
						onEdit={openEditForm}
					/>
				)}

				{activeTab === "postulantes" && (
					<ApplicationsTable applications={applications} />
				)}

				{activeTab === "configuracion" && (
					<UsersTable
						users={users}
						onAddUser={openCreateUserForm}
						onEdit={(user) => {
							setUserToEdit(user);
							setIsUserFormOpen(true);
						}}
					/>
				)}

				{/* 🌟 RENDERIZAMOS EL COMPONENTE DE PERFIL */}
				{activeTab === "perfil" && <Profile />}
			</main>

			{/* FORMULARIO LATERAL: VACANTES */}
			{isFormOpen && activeTab === "vacantes" && (
				<div className='cms-sheet-overlay' onClick={() => setIsFormOpen(false)}>
					<div
						className='cms-sheet-content'
						onClick={(e) => e.stopPropagation()}
					>
						<JobForm
							jobToEdit={jobToEdit}
							onSubmitSuccess={handleSuccess}
							onCancel={() => setIsFormOpen(false)}
						/>
					</div>
				</div>
			)}

			{/* FORMULARIO LATERAL: NUEVO USUARIO */}
			{isUserFormOpen && activeTab === "configuracion" && (
				<div
					className='cms-sheet-overlay'
					onClick={() => setIsUserFormOpen(false)}
				>
					<div
						className='cms-sheet-content'
						onClick={(e) => e.stopPropagation()}
					>
						<UserForm
							userToEdit={userToEdit}
							onSubmitSuccess={handleUserSuccess}
							onCancel={() => setIsUserFormOpen(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CmsDashboard;
