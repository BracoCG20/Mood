import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import './CmsLogin.scss';

// Si tienes un logo en assets, impórtalo aquí.
import logo from '../../assets/Logo_Mood.svg';

const CmsLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      alert('Por favor, ingresa tus credenciales.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
      } else {
        alert(data.message || 'Credenciales inválidas');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error al conectar con el servidor.');
      setIsLoading(false);
    }
  };

  return (
    <div className='cms-login-container'>
      <div className='login-box'>
        {/* --- PANEL IZQUIERDO (Branding) --- */}
        <div className='login-brand-panel'>
          <div className='brand-content'>
            <span className='brand-badge'>Plataforma Centralizada</span>
            <h1>
              Gestión <br />
              Inteligente <br />
              del Talento
            </h1>
            <p>
              El sistema integral más eficiente para el control y administración
              de recursos humanos en <strong>Mood</strong>.
            </p>
          </div>

          {/* Elementos decorativos de fondo para el panel */}
          <div className='circle-decoration circle-1'></div>
          <div className='circle-decoration circle-2'></div>
        </div>

        {/* --- PANEL DERECHO (Formulario de Acceso) --- */}
        <div className='login-form-panel'>
          <div className='form-wrapper'>
            {/* Cabecera del formulario */}
            <div className='form-header'>
              <div className='logo-container'>
                {/* Puedes usar el img si tienes el logo importado: <img src={logo} alt='Mood Logo' /> */}
                {/* <span className='logo-text'>Mood</span> */}
                <img
                  src={logo}
                  alt='Mood Logo'
                />
              </div>
              <h2>Panel de Control</h2>
              <p className='subtitle'>Inicio de Sesión</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Input: Correo Electrónico */}
              <div className={`modern-input-group ${email ? 'has-value' : ''}`}>
                <div className='input-content'>
                  <label>Correo Electrónico</label>
                  <input
                    type='email'
                    placeholder='rrhh@mood.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className='icon-container'>
                  <Mail size={18} />
                </div>
              </div>

              {/* Input: Contraseña */}
              <div
                className={`modern-input-group ${password ? 'has-value' : ''}`}
              >
                <div className='input-content'>
                  <label>Contraseña</label>
                  <input
                    type='password'
                    placeholder='Mínimo 8 caracteres'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className='icon-container'>
                  <Lock size={18} />
                </div>
              </div>

              {/* Botón de Ingreso */}
              <div className='form-actions'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className={`btn-ingresar ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        className='spinner'
                        size={20}
                      />{' '}
                      Ingresando
                    </>
                  ) : (
                    <>
                      Ingresar <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className='footer-copy'>
              @ Copyright {new Date().getFullYear()}, Mood - Todos los derechos
              reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsLogin;
