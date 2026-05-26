import { useState, useEffect } from 'react';
import CmsSidebar from '../../components/Cms/CmsSidebar';
import JobsTable from '../../components/Cms/JobsTable';
import JobForm from '../../components/Cms/JobForm';
import { Plus } from 'lucide-react';
import './CmsDashboard.scss';

const CmsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error al cargar vacantes:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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

  // 🌟 NUEVO: Función para cambiar el estado llamando al Backend
  const handleToggleStatus = async (jobId) => {
    const token = localStorage.getItem('cms_token');

    // Preguntar confirmación si es dar de baja (opcional pero buena UX)
    const isConfirmed = window.confirm(
      '¿Seguro que deseas cambiar el estado de esta vacante?',
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        fetchJobs(); // Recargamos la lista para ver el cambio de color
      } else {
        alert('Error al intentar cambiar el estado de la vacante.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className='cms-layout'>
      <CmsSidebar />

      <main className='cms-main-content'>
        <header className='cms-main-content__header'>
          <div>
            <h1>Gestión de Vacantes</h1>
            <p>Administra los puestos de trabajo disponibles en la agencia.</p>
          </div>
          <button
            className='cms-btn-primary'
            onClick={() => setIsFormOpen(true)}
          >
            <Plus
              size={16}
              strokeWidth={3}
            />{' '}
            Nueva Vacante
          </button>
        </header>

        {/* 🌟 Le pasamos la función a la tabla como Prop */}
        <JobsTable
          jobs={jobs}
          onToggleStatus={handleToggleStatus}
        />
      </main>

      {isFormOpen && (
        <div
          className='cms-sheet-overlay'
          onClick={() => setIsFormOpen(false)}
        >
          <div
            className='cms-sheet-content'
            onClick={(e) => e.stopPropagation()}
          >
            <JobForm
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
