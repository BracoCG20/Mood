// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircleMore } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoMood from '../../assets/Logo_Mood.svg';
import './Navbar.scss';

/**
 * Componente de Navegación Principal.
 * Gestiona el estado de scroll, menú móvil (hamburguesa), adaptación
 * de estilos según la ruta actual y el enrutamiento dinámico por idiomas.
 */
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.toUpperCase() || 'ES';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook para cambiar la URL manualmente

  // Obtenemos la ruta limpia (sin el /en) para hacer comprobaciones consistentes
  const cleanPath = location.pathname.replace(/^\/en/, '') || '/';

  // Define las rutas que requieren la versión oscura del Navbar (texto blanco)
  const isDarkMode =
    cleanPath === '/' ||
    cleanPath === '/mood-print' ||
    cleanPath === '/trabaja_con_nosotros';

  // Detección de scroll para contraer el Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloqueo de scroll en el body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  /**
   * Helper para generar las URLs de los enlaces (Links)
   * Si estamos en inglés, le agrega el prefijo /en a las rutas
   */
  const getLocalizedPath = (basePath) => {
    const isEn = location.pathname.startsWith('/en');
    if (isEn) {
      return basePath === '/' ? '/en' : `/en${basePath}`;
    }
    return basePath;
  };

  /**
   * Helper para cambiar de idioma
   * Modifica la URL agregando o quitando el prefijo /en
   */
  const handleLanguageSwitch = (targetLang) => {
    const isCurrentlyEn = location.pathname.startsWith('/en');
    let targetPath = location.pathname;

    if (targetLang === 'EN' && !isCurrentlyEn) {
      // Estamos en ES y queremos ir a EN
      targetPath = targetPath === '/' ? '/en' : `/en${targetPath}`;
    } else if (targetLang === 'ES' && isCurrentlyEn) {
      // Estamos en EN y queremos ir a ES
      targetPath = targetPath.replace(/^\/en/, '') || '/';
    }

    navigate(targetPath);
    closeMenu();
  };

  return (
    <header
      className={`header 
        ${isScrolled ? 'header--scrolled' : ''} 
        ${isMenuOpen ? 'header--menu-open' : ''} 
        ${isDarkMode ? 'header--dark-mode' : ''}`}
    >
      <nav className='navbar'>
        <Link
          to={getLocalizedPath('/')}
          className='navbar__brand'
          aria-label='Ir al inicio'
          onClick={closeMenu}
        >
          <img
            src={logoMood}
            alt='Mood Logo'
            className='navbar__logo'
            width='120'
            height='40'
          />
        </Link>

        {/* Navegación Desktop */}
        <ul className='navbar__nav navbar__desktop-only'>
          <li className='navbar__item'>
            <Link
              to={getLocalizedPath('/adn-mood')}
              className={`navbar__link ${cleanPath === '/adn-mood' ? 'navbar__link--active' : ''}`}
            >
              {t('navbar.adn')}
            </Link>
          </li>
          <li className='navbar__item'>
            <Link
              to={getLocalizedPath('/mood-print')}
              className={`navbar__link ${cleanPath === '/mood-print' ? 'navbar__link--active' : ''}`}
            >
              {t('navbar.print')}
            </Link>
          </li>
          <li className='navbar__item'>
            <Link
              to={getLocalizedPath('/mood-mind')}
              className={`navbar__link ${cleanPath === '/mood-mind' ? 'navbar__link--active' : ''}`}
            >
              {t('navbar.mind')}
            </Link>
          </li>
        </ul>

        {/* Acciones Desktop: Idiomas y Botón de Contacto */}
        <div className='navbar__actions navbar__desktop-only'>
          <div className='navbar__lang-selector'>
            <button
              className={`navbar__lang-btn ${currentLang === 'ES' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => handleLanguageSwitch('ES')}
            >
              ES
            </button>
            <button
              className={`navbar__lang-btn ${currentLang === 'EN' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => handleLanguageSwitch('EN')}
            >
              EN
            </button>
          </div>

          <Link
            to={getLocalizedPath('/contacto')}
            className='btn btn--contact'
          >
            <span>{t('navbar.contact')}</span>
            <MessageCircleMore
              size={18}
              className='btn__icon'
            />
          </Link>
        </div>

        {/* Botón Menú Hamburguesa */}
        <button
          className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Alternar menú'
        >
          <span className='navbar__toggle-line'></span>
          <span className='navbar__toggle-line'></span>
        </button>
      </nav>

      {/* Menú Overlay Fullscreen para Móviles */}
      <div className={`mobile-panel ${isMenuOpen ? 'mobile-panel--open' : ''}`}>
        <ul className='mobile-panel__nav'>
          <li>
            <Link
              to={getLocalizedPath('/adn-mood')}
              className={`mobile-panel__link ${cleanPath === '/adn-mood' ? 'mobile-panel__link--active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.adn')}
            </Link>
          </li>
          <li>
            <Link
              to={getLocalizedPath('/mood-print')}
              className={`mobile-panel__link ${cleanPath === '/mood-print' ? 'mobile-panel__link--active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.print')}
            </Link>
          </li>
          <li>
            <Link
              to={getLocalizedPath('/mood-mind')}
              className={`mobile-panel__link ${cleanPath === '/mood-mind' ? 'mobile-panel__link--active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.mind')}
            </Link>
          </li>
        </ul>

        <div className='mobile-panel__actions'>
          <div className='navbar__lang-selector'>
            <button
              className={`navbar__lang-btn ${currentLang === 'ES' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => handleLanguageSwitch('ES')}
            >
              ES
            </button>
            <button
              className={`navbar__lang-btn ${currentLang === 'EN' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => handleLanguageSwitch('EN')}
            >
              EN
            </button>
          </div>

          <Link
            to={getLocalizedPath('/contacto')}
            className='btn btn--contact mobile-panel__btn'
            onClick={closeMenu}
          >
            <span>{t('navbar.contact')}</span>
            <MessageCircleMore
              size={18}
              className='btn__icon'
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
