import { useState, useRef } from 'react';
import Select from 'react-select';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
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
  const fileInputRef = useRef(null);
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!projectToEdit && !imageFile) {
      alert('⚠️ La imagen principal del proyecto es obligatoria.');
      return;
    }

    const confirmPublish = window.confirm(
      projectToEdit
        ? '¿Estás seguro de guardar los cambios en este proyecto?'
        : '¿Estás seguro de publicar este proyecto en el portafolio?',
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
        alert(
          projectToEdit
            ? '✅ ¡Proyecto actualizado!'
            : '✅ ¡Proyecto publicado con éxito!',
        );
        onSubmitSuccess();
      } else {
        alert('❌ Hubo un error al guardar el proyecto.');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div
            className='cms-project-form__section'
            style={{ alignItems: 'center' }}
          >
            <label
              style={{
                alignSelf: 'flex-start',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Imagen Principal (Obligatoria)
            </label>
            <div
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '2px dashed #cbd5e1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt='Preview'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>
                  <ImageIcon
                    size={40}
                    color='#94a3b8'
                    style={{ marginBottom: '10px' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Clic para subir imagen (Alta calidad)
                  </span>
                </>
              )}
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageChange}
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
                placeholder='Ej. Rebranding AutoStar'
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
                  placeholder='Ej. Octubre 2023'
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
                  placeholder='Ej. AutoStar Motors'
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
                  placeholder='https://...'
                />
              </div>
            </div>

            <div className='cms-project-form__group'>
              <label>Descripción / Detalle del trabajo (Opcional)</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Detalles de lo que se hizo...'
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
