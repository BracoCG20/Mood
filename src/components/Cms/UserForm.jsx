import { useState, useEffect } from 'react';
import Select from 'react-select';
import { X, Loader2, Save } from 'lucide-react';
import './UserForm.scss';

const roleOptions = [
  { value: 1, label: 'SuperAdmin' },
  { value: 2, label: 'GTH' },
];

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#ffffff',
    borderColor: state.isFocused ? '#0f172a' : '#cbd5e1',
    boxShadow: state.isFocused ? '0 0 0 1px #0f172a' : 'none',
    '&:hover': { borderColor: state.isFocused ? '#0f172a' : '#94a3b8' },
    borderRadius: '6px',
    fontSize: '0.875rem',
    minHeight: '38px',
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#0f172a'
      : state.isFocused
        ? '#f1f5f9'
        : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#0f172a',
    fontSize: '0.875rem',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '6px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    zIndex: 5,
  }),
};

const UserForm = ({ userToEdit, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    country: '',
    role_id: 2,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [countryOptions, setCountryOptions] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/countries');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setCountryOptions(result.data);
          }
        }
      } catch (error) {
        console.error('Error al cargar países:', error);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        first_name: userToEdit.first_name || '',
        last_name: userToEdit.last_name || '',
        email: userToEdit.email || '',
        password: '', // 🌟 Siempre iniciamos la contraseña en blanco por seguridad
        country: userToEdit.country || '',
        role_id: userToEdit.role_id || 2,
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      role_id: selected ? selected.value : 2,
    }));
  };

  const handleCountryChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      country: selected ? selected.value : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const currentAdminId = 1;

    // Si estamos editando y no se escribió contraseña, la eliminamos del objeto para no enviarla vacía
    const bodyData = {
      ...formData,
      updated_by: currentAdminId,
      created_by: currentAdminId,
    };

    if (userToEdit && bodyData.password === '') {
      delete bodyData.password;
    }

    try {
      const url = userToEdit
        ? `http://localhost:5000/api/users/${userToEdit.id}`
        : 'http://localhost:5000/api/users';

      const method = userToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess();
      } else {
        setErrorMsg(
          data.message || 'Ocurrió un error al procesar la solicitud.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='cms-user-form'>
      <header className='cms-user-form__header'>
        <div>
          <h2>{userToEdit ? 'Editar Miembro' : 'Nuevo Miembro'}</h2>
          <p>Asigna accesos y datos del equipo.</p>
        </div>
        <button
          className='cms-user-form__btn-close'
          onClick={onCancel}
        >
          <X size={20} />
        </button>
      </header>

      <div className='cms-user-form__scroll-area'>
        {errorMsg && <div className='cms-user-form__alert'>{errorMsg}</div>}

        <form
          id='user-form'
          onSubmit={handleSubmit}
          className='cms-user-form__form'
        >
          <div className='cms-user-form__group-row'>
            <div className='cms-user-form__group'>
              <label>Nombre</label>
              <input
                type='text'
                name='first_name'
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='cms-user-form__group'>
              <label>Apellido</label>
              <input
                type='text'
                name='last_name'
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='cms-user-form__group'>
            <label>Correo Electrónico</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!!userToEdit} // No permitimos cambiar el correo en edición
            />
          </div>

          {/* 🌟 CAMPO DE CONTRASEÑA MODIFICADO */}
          <div className='cms-user-form__group'>
            <label>
              {userToEdit
                ? 'Nueva Contraseña (opcional)'
                : 'Contraseña temporal'}
            </label>
            <input
              type='password'
              name='password'
              value={formData.password || ''}
              onChange={handleChange}
              required={!userToEdit} // Solo es obligatorio al crear
              placeholder={userToEdit ? 'Dejar en blanco para no cambiar' : ''}
            />
          </div>

          <div className='cms-user-form__group-row'>
            <div className='cms-user-form__group'>
              <label>País</label>
              <Select
                options={countryOptions}
                value={
                  countryOptions.find((o) => o.value === formData.country) ||
                  null
                }
                onChange={handleCountryChange}
                styles={selectStyles}
                isLoading={loadingCountries}
                isSearchable={true}
                placeholder='Seleccionar...'
              />
            </div>

            <div className='cms-user-form__group'>
              <label>Rol asignado</label>
              <Select
                options={roleOptions}
                value={roleOptions.find((o) => o.value === formData.role_id)}
                onChange={handleRoleChange}
                styles={selectStyles}
                isSearchable={false}
              />
            </div>
          </div>
        </form>
      </div>

      <div className='cms-user-form__actions-fixed'>
        <button
          type='button'
          className='btn-cancel'
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type='submit'
          form='user-form'
          className='btn-submit'
          disabled={loading}
        >
          {loading ? (
            <Loader2
              size={16}
              className='spinner-icon'
            />
          ) : (
            <Save size={16} />
          )}
          {userToEdit ? 'Guardar Cambios' : 'Crear Usuario'}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
