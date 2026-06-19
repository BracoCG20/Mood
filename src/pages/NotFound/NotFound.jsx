// src/pages/NotFound/NotFound.jsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import BlurText from '../../components/BlurText/BlurText';
import FuzzyText from '../../components/FuzzyText/FuzzyText';
import './NotFound.scss';
import Navbar from '../../components/Navbar/Navbar';

/**
 * Componente NotFound (Error 404).
 * Se renderiza de forma automática cuando el usuario ingresa a una URL
 * que no coincide con ninguna de las rutas declaradas en la aplicación.
 */
const NotFound = () => {
  const { t, i18n } = useTranslation();

  // Helper para redirigir a la raíz correcta según el idioma actual
  const getHomePath = () => {
    return i18n.language === 'en' ? '/en' : '/';
  };

  return (
    <section className='not-found'>
      <Navbar />
      <div className='not-found__container'>
        {/* Código de error con efecto Fuzzy (Estática) */}
        <div className='not-found__fuzzy-wrapper'>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            fontSize={180}
            enableHover
            className='not-found__code'
          >
            404
          </FuzzyText>
        </div>

        {/* Título de la página */}
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          className='not-found__title'
        >
          {t('notfound.title', 'Página no encontrada')}
        </FuzzyText>

        {/* Mensaje descriptivo */}
        <p className='not-found__message'>
          {t(
            'notfound.message',
            'Lo sentimos, la página que estás buscando no existe, ha sido movida o cambió de nombre.',
          )}
        </p>

        {/* Botón de retorno seguro */}
        <div className='not-found__actions'>
          <Link
            to={getHomePath()}
            className='btn btn--primary not-found__btn'
          >
            <Home
              size={18}
              strokeWidth={2}
            />
            <span>{t('notfound.button', 'Volver al Inicio')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
