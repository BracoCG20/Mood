import { useState, useEffect } from 'react';
import CmsSidebar from '../../components/Cms/CmsSidebar';
import JobsTable from '../../components/Cms/JobsTable';
import JobForm from '../../components/Cms/JobForm';
import ApplicationsTable from '../../components/Cms/ApplicationsTable'; // 🌟 Nuevo componente que crearemos
import { Plus } from 'lucide-react';
import './CmsDashboard.scss';

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState('vacantes'); // 🌟 Estado de pestañas
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]); // 🌟 Estado de postulantes
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

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

  // 🌟 Cargar datos dependiendo de la pestaña activa
  useEffect(() => {
    if (activeTab === 'vacantes') fetchJobs();
    if (activeTab === 'postulantes') fetchApplications();
  }, [activeTab]);

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFormOpen]);

  const handleSuccess = () => {
    setIsFormOpen(false);
    fetchJobs();
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

  return (
    <div className='cms-layout'>
      <CmsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className='cms-main-content'>
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

        {/* 🌟 RENDERIZADO CONDICIONAL DE TABLAS */}
        {activeTab === 'vacantes' ? (
          <JobsTable
            jobs={jobs}
            onToggleStatus={handleToggleStatus}
            onEdit={openEditForm}
          />
        ) : (
          <ApplicationsTable applications={applications} />
        )}
      </main>

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
    </div>
  );
};

export default CmsDashboard;
