import { X, ExternalLink } from 'lucide-react';
import './ProjectModal.scss';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className='project-modal'>
      {/* Fondo oscuro desenfocado */}
      <div
        className='project-modal__overlay'
        onClick={onClose}
      ></div>

      {/* Contenedor del Modal */}
      <div className='project-modal__content'>
        <button
          className='project-modal__close'
          onClick={onClose}
          aria-label='Cerrar modal'
        >
          <X size={24} />
        </button>

        <div className='project-modal__image-wrapper'>
          <img
            src={project.img}
            alt={project.title}
          />
        </div>

        <div className='project-modal__info'>
          {/* BADGE: Ahora con el color primary sólido */}
          <span className='project-modal__badge'>{project.category}</span>

          <h3 className='project-modal__title'>{project.title}</h3>

          {/* META: Sin la línea fea de separación */}
          <div className='project-modal__meta'>
            <p>
              <strong>Cliente:</strong> {project.client}
            </p>
            <p>
              <strong>Fecha:</strong> {project.date}
            </p>
          </div>

          <p className='project-modal__desc'>{project.description}</p>

          {/* NUEVO: BOTÓN DE REDIRECCIÓN */}
          <a
            href={project.url || '#'}
            target='_blank'
            rel='noopener noreferrer'
            className='project-modal__btn'
          >
            Ver Proyecto <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
