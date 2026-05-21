import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Select from 'react-select';
import BlurText from '../BlurText/BlurText';
import './ContactHero.scss';

const COUNTRY_OPTIONS = [
  { value: 'Peru', label: 'Perú' },
  { value: 'Mexico', label: 'México' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Espana', label: 'España' },
  { value: 'Otro', label: 'Otro' },
];

const ContactHero = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    celular: '',
    pais: null,
    mensaje: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, pais: selectedOption }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Formateamos los datos exactamente como queremos leerlos en el correo
    const dataToSend = {
      Nombre: formData.nombre,
      Correo: formData.correo,
      Celular: formData.celular,
      País: formData.pais ? formData.pais.label : 'No especificado',
      Mensaje: formData.mensaje,
      // --- Configuraciones especiales de FormSubmit ---
      _subject: `¡Nuevo Lead Mood! - ${formData.nombre}`, // Asunto del correo
      _cc: 'tecnologia@mood.pe', // Correo en copia
      _captcha: 'false', // Evita que abra una pestaña de "No soy un robot"
      _template: 'table', // Le da un diseño más bonito al correo que llega
    };

    try {
      // Usamos la API AJAX de FormSubmit apuntando al correo principal
      const response = await fetch(
        'https://formsubmit.co/ajax/cbraco@gruposp.pe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', // Crucial para que no recargue la página
          },
          body: JSON.stringify(dataToSend),
        },
      );

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nombre: '',
          correo: '',
          celular: '',
          pais: null,
          mensaje: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error enviando a FormSubmit:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='contact-hero'>
      <div className='contact-hero__container'>
        <div className='contact-hero__content'>
          <div className='contact-hero__title-group'>
            <BlurText
              text='Hagamos algo'
              delay={30}
              animateBy='words'
              direction='top'
              as='h1'
              className='contact-hero__title contact-hero__title--light'
            />
            <div className='contact-hero__line'>
              <BlurText
                text='increíble'
                delay={45}
                animateBy='words'
                direction='top'
                as='span'
                className='contact-hero__highlight'
              />
              <BlurText
                text='juntos.'
                delay={60}
                animateBy='words'
                direction='top'
                as='h1'
                className='contact-hero__title'
              />
            </div>
          </div>

          <div
            className='contact-hero__fade-in'
            style={{ animationDelay: '0.4s' }}
          >
            <p className='contact-hero__subtitle'>
              ¿Tienes un proyecto en mente o necesitas escalar tu marca? Déjanos
              tus datos y un estratega de nuestro equipo se pondrá en contacto
              contigo en menos de 24 horas.
            </p>
          </div>
        </div>

        <div
          className='contact-hero__form-wrapper contact-hero__fade-in'
          style={{ animationDelay: '0.6s' }}
        >
          <form
            className='contact-form'
            onSubmit={handleSubmit}
          >
            <div className='contact-form__header'>
              <h3>Empieza tu transformación</h3>
            </div>

            <div className='contact-form__group'>
              <label htmlFor='nombre'>Nombre completo</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder='Ej. Carlos Mendoza'
              />
            </div>

            <div className='contact-form__group'>
              <label htmlFor='correo'>Correo de empresa</label>
              <input
                type='email'
                id='correo'
                name='correo'
                value={formData.correo}
                onChange={handleChange}
                required
                placeholder='carlos@tuempresa.com'
              />
            </div>

            <div className='contact-form__row'>
              <div className='contact-form__group'>
                <label htmlFor='celular'>Celular / WhatsApp</label>
                <input
                  type='tel'
                  id='celular'
                  name='celular'
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  placeholder='+51 987 654 321'
                />
              </div>

              <div className='contact-form__group'>
                <label htmlFor='pais'>País</label>
                <Select
                  inputId='pais'
                  options={COUNTRY_OPTIONS}
                  value={formData.pais}
                  onChange={handleSelectChange}
                  placeholder='Selecciona...'
                  classNamePrefix='custom-select'
                  required
                />
              </div>
            </div>

            <div className='contact-form__group'>
              <label htmlFor='mensaje'>Cuéntanos sobre tu proyecto</label>
              <textarea
                id='mensaje'
                name='mensaje'
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows='4'
                placeholder='¿Qué objetivos quieres alcanzar?'
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <p className='contact-form__feedback contact-form__feedback--success'>
                ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className='contact-form__feedback contact-form__feedback--error'>
                Hubo un error al enviar tu mensaje. Inténtalo de nuevo.
              </p>
            )}

            <button
              type='submit'
              className='contact-form__submit'
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              <span>{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}</span>
              {isSubmitting ? (
                <Loader2
                  size={18}
                  className='spin-animation'
                />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
