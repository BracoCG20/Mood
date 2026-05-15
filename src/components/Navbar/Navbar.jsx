import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import './Navbar.scss';
import logoMood from '../../assets/Logo_mood.svg';

const Navbar = () => {
  const [lang, setLang] = useState('ES');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efecto para detectar el scroll de la página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NUEVO: Efecto para bloquear el scroll del fondo cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      // Bloquea el scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restaura el scroll
      document.body.style.overflow = '';
    }

    // Limpieza de seguridad en caso de que el componente se desmonte
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMenuOpen ? 'header--menu-open' : ''}`}
    >
      <nav className='navbar'>
        <a
          href='/'
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
        </a>

        <ul className='navbar__nav navbar__desktop-only'>
          <li className='navbar__item'>
            <a
              href='#adn'
              className='navbar__link'
            >
              ADN Mood
            </a>
          </li>
          <li className='navbar__item'>
            <a
              href='#print'
              className='navbar__link'
            >
              Mood Print
            </a>
          </li>
          <li className='navbar__item'>
            <a
              href='#what'
              className='navbar__link'
            >
              #What'sYourMood
            </a>
          </li>
        </ul>

        <div className='navbar__actions navbar__desktop-only'>
          <div className='navbar__lang-selector'>
            <button
              className={`navbar__lang-btn ${lang === 'ES' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => setLang('ES')}
            >
              ES
            </button>
            <button
              className={`navbar__lang-btn ${lang === 'EN' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => setLang('EN')}
            >
              EN
            </button>
          </div>

          <a
            href='#contacto'
            className='btn btn--contact'
          >
            <span>Contacto</span>
            <Sparkles
              size={18}
              className='btn__icon'
            />
          </a>
        </div>

        <button
          className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Alternar menú'
        >
          <span className='navbar__toggle-line'></span>
          <span className='navbar__toggle-line'></span>
        </button>
      </nav>

      {/* PANEL FULLSCREEN MÓVIL */}
      <div className={`mobile-panel ${isMenuOpen ? 'mobile-panel--open' : ''}`}>
        <ul className='mobile-panel__nav'>
          <li>
            <a
              href='#adn'
              className='mobile-panel__link'
              onClick={closeMenu}
            >
              ADN Mood
            </a>
          </li>
          <li>
            <a
              href='#print'
              className='mobile-panel__link'
              onClick={closeMenu}
            >
              Mood Print
            </a>
          </li>
          <li>
            <a
              href='#what'
              className='mobile-panel__link'
              onClick={closeMenu}
            >
              #What'sYourMood
            </a>
          </li>
        </ul>

        <div className='mobile-panel__actions'>
          <div className='navbar__lang-selector'>
            <button
              className={`navbar__lang-btn ${lang === 'ES' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => {
                setLang('ES');
                closeMenu();
              }}
            >
              ES
            </button>
            <button
              className={`navbar__lang-btn ${lang === 'EN' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => {
                setLang('EN');
                closeMenu();
              }}
            >
              EN
            </button>
          </div>

          <a
            href='#contacto'
            className='btn btn--contact mobile-panel__btn'
            onClick={closeMenu}
          >
            <span>Contacto</span>
            <Sparkles
              size={18}
              className='btn__icon'
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
