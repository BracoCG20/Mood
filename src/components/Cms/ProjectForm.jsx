import { useState, useRef } from 'react';
import Select from 'react-select';
import {
  ArrowRight,
  Image as ImageIcon,
  Video as VideoIcon,
  Trash2,
} from 'lucide-react';
import './ProjectForm.scss';

const categoryOptions = [
  { value: 'Branding', label: 'Branding' },
  { value: 'Diseño Web', label: 'Diseño Web' },
  { value: 'Marketing Digital', label: 'Marketing Digital' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Contenido Audiovisual', label: 'Contenido Audiovisual' },
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#ffffff',
    borderColor: state.isFocused ? '#000000' : 'rgba(0, 0, 0, 0.15)',
    boxShadow: state.isFocused ? '0 0 0 1px #000000' : 'none',
    borderRadius: '6px',
    padding: '0 2px',
    minHeight: '38px',
    fontSize: '0.875rem',
    cursor: 'pointer',
    '&:hover': {
      borderColor: state.isFocused ? '#000000' : 'rgba(0, 0, 0, 0.25)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.875rem',
    backgroundColor: state.isSelected
      ? '#000000'
      : state.isFocused
        ? 'rgba(0,0,0,0.05)'
        : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#000000',
    cursor: 'pointer',
  }),
  menu: (provided) => ({ ...provided, zIndex: 5 }),
};

const ProjectForm = ({ onSubmitSuccess, onCancel, projectToEdit }) => {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    projectToEdit?.img_url || '',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: projectToEdit?.title || '',
    category: projectToEdit?.category || 'Branding',
    client: projectToEdit?.client || '',
    date: projectToEdit?.date || '',
    description: projectToEdit?.description || '',
    project_url: projectToEdit?.project_url || '',
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSelectChange = (selectedOption) =>
    setFormData({ ...formData, category: selectedOption.value });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeInMB = file.size / (1024 * 1024);
    if (type === 'image' && sizeInMB > 2) {
      alert('⚠️ La imagen no debe superar los 2MB.');
      e.target.value = '';
      return;
    }
    if (type === 'video' && sizeInMB > 15) {
      alert('⚠️ El video no debe superar los 15MB.');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearMedia = () => {
    setImageFile(null);
    setImagePreview('');
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile && !imagePreview) {
      alert('⚠️ El archivo del proyecto (Imagen o Video) es obligatorio.');
      return;
    }

    const confirmPublish = window.confirm(
      projectToEdit
        ? '¿Guardar cambios?'
        : '¿Publicar proyecto en el portafolio?',
    );
    if (!confirmPublish) return;

    setIsSubmitting(true);
    const token = localStorage.getItem('cms_token');

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('category', formData.category);
    dataToSend.append('client', formData.client);
    dataToSend.append('date', formData.date);
    dataToSend.append('description', formData.description);
    dataToSend.append('project_url', formData.project_url);
    if (imageFile) dataToSend.append('img_url', imageFile);

    try {
      const url = projectToEdit
        ? `http://localhost:5000/api/projects/${projectToEdit.id}`
        : 'http://localhost:5000/api/projects';
      const method = projectToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSend,
      });

      if (response.ok) {
        alert('✅ ¡Proyecto guardado con éxito!');
        onSubmitSuccess();
      } else {
        alert('❌ Error al guardar el proyecto.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVideoMedia =
    imagePreview.match(/\.(mp4|webm|mov|ogg)$/i) ||
    (imageFile && imageFile.type.startsWith('video/'));

  return (
    <div className='cms-project-form'>
      <div className='cms-project-form__header-fixed'>
        <h2>{projectToEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
      </div>

      <form
        className='cms-project-form__step-wrapper'
        onSubmit={handleFinalSubmit}
      >
        <div className='cms-project-form__scroll-area'>
          {/* 🌟 ÁREA DE MEDIA SHADCN STYLE */}
          <div className='cms-project-form__section'>
            <label style={{ fontWeight: 500, fontSize: '0.875rem' }}>
              Media del Proyecto
            </label>

            {imagePreview ? (
              // VISTA DE PREVIEW (Con botón de borrar flotante)
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                }}
              >
                {isVideoMedia ? (
                  <video
                    src={imagePreview}
                    autoPlay
                    muted
                    loop
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <img
                    src={imagePreview}
                    alt='Preview'
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}

                <button
                  type='button'
                  onClick={clearMedia}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    padding: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    color: '#ef4444',
                  }}
                  title='Eliminar media'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ) : (
              // VISTA DE 2 BOTONES GRANDES INICIALES
              <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <button
                  type='button'
                  onClick={() => imageInputRef.current.click()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px dashed #cbd5e1',
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    gap: '0.5rem',
                    color: '#334155',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#f1f5f9')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#fafafa')
                  }
                >
                  <ImageIcon
                    size={32}
                    color='#64748b'
                  />
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                    Subir Imagen
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    JPG, PNG, WEBP (Max 2MB)
                  </span>
                </button>

                <button
                  type='button'
                  onClick={() => videoInputRef.current.click()}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px dashed #cbd5e1',
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    gap: '0.5rem',
                    color: '#334155',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#f1f5f9')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#fafafa')
                  }
                >
                  <VideoIcon
                    size={32}
                    color='#64748b'
                  />
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                    Subir Video
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    MP4, WEBM (Max 15MB)
                  </span>
                </button>
              </div>
            )}

            {/* Inputs Ocultos */}
            <input
              type='file'
              accept='image/*'
              ref={imageInputRef}
              onChange={(e) => handleFileChange(e, 'image')}
              style={{ display: 'none' }}
            />
            <input
              type='file'
              accept='video/mp4,video/webm'
              ref={videoInputRef}
              onChange={(e) => handleFileChange(e, 'video')}
              style={{ display: 'none' }}
            />
          </div>

          <div className='cms-project-form__section'>
            <div className='cms-project-form__group'>
              <label>Título del Proyecto</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='cms-project-form__group-row'>
              <div className='cms-project-form__group'>
                <label>Categoría</label>
                <Select
                  name='category'
                  options={categoryOptions}
                  value={categoryOptions.find(
                    (opt) => opt.value === formData.category,
                  )}
                  onChange={handleSelectChange}
                  styles={customSelectStyles}
                  isSearchable={false}
                />
              </div>
              <div className='cms-project-form__group'>
                <label>Fecha del Proyecto</label>
                <input
                  type='text'
                  name='date'
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='cms-project-form__group-row'>
              <div className='cms-project-form__group'>
                <label>Cliente (Marca)</label>
                <input
                  type='text'
                  name='client'
                  value={formData.client}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='cms-project-form__group'>
                <label>Enlace del Proyecto (Opcional)</label>
                <input
                  type='url'
                  name='project_url'
                  value={formData.project_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='cms-project-form__group'>
              <label>Descripción / Detalle del trabajo (Opcional)</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                className='textarea-small'
              ></textarea>
            </div>
          </div>
        </div>

        <div className='cms-project-form__actions-fixed'>
          <button
            type='button'
            className='btn-cancel'
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='btn-submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Proyecto'}{' '}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
