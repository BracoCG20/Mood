import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, Calendar, ArrowLeft, Send } from 'lucide-react';
import './JobDetail.scss';

const JobDetail = () => {
  const { jobId } = useParams(); // Extrae el ID de la URL
  const { t } = useTranslation();

  // Traemos toda la lista y buscamos el trabajo específico
  const jobsList = t('careers.jobs.list', { returnObjects: true });
  const job = jobsList.find((j) => j.id === jobId);

  // Si alguien escribe una URL incorrecta
  if (!job) {
    return (
      <div className='job-detail-not-found'>
        <h2>Trabajo no encontrado</h2>
        <Link to='/trabaja-con-nosotros'>Volver atrás</Link>
      </div>
    );
  }

  return (
    <main className='job-detail-page'>
      <div className='job-detail__container'>
        {/* Botón Volver */}
        <Link
          to='/trabaja-con-nosotros'
          className='job-detail__back'
        >
          <ArrowLeft size={20} /> Volver a posiciones
        </Link>

        {/* Cabecera */}
        <header className='job-detail__header'>
          <h1 className='job-detail__title'>{job.title}</h1>
          <div className='job-detail__meta'>
            <span className='job-detail__tag'>
              <Briefcase size={18} /> {job.type}
            </span>
            <span className='job-detail__tag'>
              <Calendar size={18} /> {job.date}
            </span>
          </div>
        </header>

        {/* Contenido Completo */}
        <div className='job-detail__content'>
          <section className='job-detail__section'>
            <h3>Descripción</h3>
            <p>{job.description}</p>
          </section>

          <section className='job-detail__section'>
            <h3>Responsabilidades / Funcionalidades</h3>
            <ul>
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className='job-detail__section'>
            <h3>Requisitos</h3>
            <ul>
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className='job-detail__section'>
            <h3>Beneficios</h3>
            <ul>
              {job.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Botón de Postulación */}
        <div className='job-detail__action'>
          <a
            href='mailto:rrhh@mood.pe'
            className='job-detail__apply-btn'
          >
            Postular a esta posición <Send size={18} />
          </a>
        </div>
      </div>
    </main>
  );
};

export default JobDetail;
