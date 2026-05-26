import { useState } from 'react';
import {
  Download,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  Eye,
  X,
  Loader2,
} from 'lucide-react';
import './ApplicationsTable.scss';

const ApplicationsTable = ({ applications }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Estados para los modales
  const [cvModalApp, setCvModalApp] = useState(null);
  const [answersModalApp, setAnswersModalApp] = useState(null);
  const [jobQuestions, setJobQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const indexOfLastApp = currentPage * itemsPerPage;
  const indexOfFirstApp = indexOfLastApp - itemsPerPage;
  const currentApps = applications.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const parseAnswers = (answersData) => {
    if (!answersData) return {};
    return typeof answersData === 'string'
      ? JSON.parse(answersData)
      : answersData;
  };

  // --- Funciones para abrir/cerrar Modales ---
  const openCvModal = (app) => setCvModalApp(app);
  const closeCvModal = () => setCvModalApp(null);

  const openAnswersModal = async (app) => {
    setAnswersModalApp(app);
    setIsLoadingQuestions(true);
    try {
      // Hacemos un fetch rápido para traer las preguntas originales del Job
      const response = await fetch(
        `http://localhost:5000/api/jobs/${app.job_id}`,
      );
      if (response.ok) {
        const data = await response.json();
        const parsedQs =
          typeof data.questions === 'string'
            ? JSON.parse(data.questions)
            : data.questions || [];
        setJobQuestions(parsedQs);
      }
    } catch (error) {
      console.error('Error al cargar preguntas de la vacante:', error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const closeAnswersModal = () => {
    setAnswersModalApp(null);
    setJobQuestions([]);
  };

  return (
    <div className='cms-table-wrapper'>
      <table className='cms-table'>
        <thead>
          <tr>
            <th>Candidato</th>
            <th>Vacante</th>
            <th>Contacto</th>
            <th>Enlaces</th>
            <th>CV / Respuestas</th>
          </tr>
        </thead>
        <tbody>
          {currentApps.length > 0 ? (
            currentApps.map((app) => (
              <tr key={app.id}>
                <td>
                  <div className='app-candidate'>
                    <span className='font-medium'>{app.name}</span>
                    <span className='app-date'>
                      Postuló: {formatDate(app.created_at)}
                    </span>
                  </div>
                </td>
                <td>
                  <span className='badge badge--inactive'>{app.job_title}</span>
                </td>
                <td>
                  <div className='app-contact'>
                    <a href={`mailto:${app.email}`}>
                      <Mail size={14} /> {app.email}
                    </a>
                    <a
                      href={`https://wa.me/${app.phone?.replace(/\D/g, '')}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Phone size={14} /> {app.phone}
                    </a>
                  </div>
                </td>
                <td>
                  <div className='app-links'>
                    {app.linkedin && (
                      <a
                        href={app.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink size={14} /> LinkedIn
                      </a>
                    )}
                    {app.behance && (
                      <a
                        href={app.behance}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink size={14} /> Portfolio
                      </a>
                    )}
                    {app.github && (
                      <a
                        href={app.github}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </td>
                <td>
                  <div className='app-actions'>
                    <button
                      className='btn-action btn--activate'
                      onClick={() => openCvModal(app)}
                      title='Ver CV'
                    >
                      <Eye size={16} /> Ver CV
                    </button>

                    {Object.keys(parseAnswers(app.answers)).length > 0 && (
                      <button
                        className='btn-action btn--edit'
                        onClick={() => openAnswersModal(app)}
                        title='Ver respuestas del candidato'
                      >
                        <FileText size={16} /> Respuestas
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan='5'
                className='cms-table__empty'
              >
                Aún no hay postulantes registrados en el sistema.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className='cms-pagination'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* =========================================
          MODAL: VER CV
          ========================================= */}
      {cvModalApp && (
        <div
          className='cms-modal-overlay'
          onClick={closeCvModal}
        >
          <div
            className='cms-modal-content modal-cv'
            onClick={(e) => e.stopPropagation()}
          >
            <header className='cms-modal-header'>
              <div>
                <h3>CV de {cvModalApp.name}</h3>
                <p>Postulante a: {cvModalApp.job_title}</p>
              </div>
              <div className='modal-header-actions'>
                <a
                  href={cvModalApp.cv_url}
                  download
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-download-icon'
                  title='Descargar externo'
                >
                  <Download size={18} />
                </a>
                <button
                  className='btn-close'
                  onClick={closeCvModal}
                >
                  <X size={24} />
                </button>
              </div>
            </header>
            <div className='cms-modal-body'>
              {/* Renderizamos el PDF directamente mediante un iframe */}
              <iframe
                src={cvModalApp.cv_url}
                className='cv-iframe'
                title={`CV de ${cvModalApp.name}`}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL: VER RESPUESTAS
          ========================================= */}
      {answersModalApp && (
        <div
          className='cms-modal-overlay'
          onClick={closeAnswersModal}
        >
          <div
            className='cms-modal-content modal-answers'
            onClick={(e) => e.stopPropagation()}
          >
            <header className='cms-modal-header'>
              <div>
                <h3>Cuestionario de {answersModalApp.name}</h3>
                <p>Postulante a: {answersModalApp.job_title}</p>
              </div>
              <button
                className='btn-close'
                onClick={closeAnswersModal}
              >
                <X size={24} />
              </button>
            </header>

            <div className='cms-modal-body'>
              {isLoadingQuestions ? (
                <div className='loading-answers'>
                  <Loader2
                    className='spinner-icon'
                    size={32}
                  />
                  <p>Cargando cuestionario...</p>
                </div>
              ) : jobQuestions.length > 0 ? (
                <div className='qa-list'>
                  {jobQuestions.map((q, index) => {
                    const candidateAnswer = parseAnswers(
                      answersModalApp.answers,
                    )[q.id];

                    // Formatear si es array (múltiple) o texto
                    const formattedAnswer = Array.isArray(candidateAnswer)
                      ? candidateAnswer.join(' • ')
                      : candidateAnswer || 'No respondió';

                    return (
                      <div
                        key={q.id}
                        className='qa-block'
                      >
                        <div className='q-label'>
                          <span className='q-number'>{index + 1}.</span>{' '}
                          {q.label}
                        </div>
                        <div className='a-text'>{formattedAnswer}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className='no-questions-msg'>
                  No se encontraron preguntas para esta vacante.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTable;
