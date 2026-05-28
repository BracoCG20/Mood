import { useState, useEffect } from 'react';
import CmsSidebar from '../../components/Cms/CmsSidebar';
import JobsTable from '../../components/Cms/JobsTable';
import JobForm from '../../components/Cms/JobForm';
import ApplicationsTable from '../../components/Cms/ApplicationsTable';
import UsersTable from '../../components/Cms/UsersTable';
import UserForm from '../../components/Cms/UserForm'; // 🌟 Importamos el nuevo formulario lateral
import { Plus } from 'lucide-react';
import './CmsDashboard.scss';

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState('vacantes');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]); // 🌟 Almacenará los usuarios reales de la BD

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  // 🌟 Estados para el formulario lateral de Usuarios
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error al cargar vacantes:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error al cargar postulaciones:', error);
    }
  };

  // 🌟 FUNCIÓN REAL PARA TRAER LOS USUARIOS DESDE TU BACKEND
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  // 🌟 Cargar datos dependiendo de la pestaña activa
  useEffect(() => {
    if (activeTab === 'vacantes') fetchJobs();
    if (activeTab === 'postulantes') fetchApplications();
    if (activeTab === 'configuracion') fetchUsers(); // 🌟 Llamada real a la BD
  }, [activeTab]);

  // Bloquear scroll si algún panel lateral está abierto
  useEffect(() => {
    document.body.style.overflow = isFormOpen || isUserFormOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFormOpen, isUserFormOpen]);

  const handleSuccess = () => {
    setIsFormOpen(false);
    fetchJobs();
  };

  // 🌟 Callback de éxito al guardar un usuario
  const handleUserSuccess = () => {
    setIsUserFormOpen(false);
    fetchUsers(); // Recarga la tabla de usuarios al instante
  };

  const handleToggleStatus = async (jobId) => {
    const token = localStorage.getItem('cms_token');
    const isConfirmed = window.confirm(
      '¿Seguro que deseas cambiar el estado de esta vacante?',
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}/status`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) fetchJobs();
    } catch (error) {
      console.error('Error:', error);
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
      console.error('Error al cargar detalles para edición:', error);
    }
  };

  // 🌟 Abrir el formulario lateral para un nuevo usuario
  const openCreateUserForm = () => {
    setUserToEdit(null);
    setIsUserFormOpen(true);
  };

  return (
    <div className='cms-layout'>
      <CmsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className='cms-main-content'>
        {activeTab !== 'configuracion' && (
          <header className='cms-main-content__header'>
            <div>
              <h1>
                {activeTab === 'vacantes'
                  ? 'Gestión de Vacantes'
                  : 'Base de Postulantes'}
              </h1>
              <p>
                {activeTab === 'vacantes'
                  ? 'Administra los puestos de trabajo disponibles en la agencia.'
                  : 'Revisa y descarga los perfiles de los talentos que han postulado.'}
              </p>
            </div>

            {activeTab === 'vacantes' && (
              <button
                className='cms-btn-primary'
                onClick={openCreateForm}
              >
                <Plus
                  size={16}
                  strokeWidth={3}
                />{' '}
                Nueva Vacante
              </button>
            )}
          </header>
        )}

        {/* RENDERIZADO CONDICIONAL DE TABLAS */}
        {activeTab === 'vacantes' && (
          <JobsTable
            jobs={jobs}
            onToggleStatus={handleToggleStatus}
            onEdit={openEditForm}
          />
        )}

        {activeTab === 'postulantes' && (
          <ApplicationsTable applications={applications} />
        )}

        {activeTab === 'configuracion' && (
          <UsersTable
            users={users}
            onAddUser={openCreateUserForm} // 🌟 Conectamos la apertura del modal lateral
            onEdit={(user) => {
              setUserToEdit(user);
              setIsUserFormOpen(true);
            }}
          />
        )}
      </main>

      {/* FORMULARIO LATERAL: VACANTES */}
      {isFormOpen && activeTab === 'vacantes' && (
        <div
          className='cms-sheet-overlay'
          onClick={() => setIsFormOpen(false)}
        >
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

      {/* 🌟 FORMULARIO LATERAL: NUEVO USUARIO (Alineado a tus estilos de overlays existentes) */}
      {isUserFormOpen && activeTab === 'configuracion' && (
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
