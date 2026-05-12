import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import './Navbar.scss';
import logoMood from '../../assets/Logo_mood.svg';

const Navbar = () => {
  const [lang, setLang] = useState('ES');
  // NUEVO: Estado para detectar el scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // NUEVO: Efecto que escucha el scroll de la ventana
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // NUEVO: Se aplica la clase condicional '--scrolled' al header
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <nav className='navbar'>
        {/* Bloque 1: Logo con redirección al inicio */}
        <a
          href='/'
          className='navbar__brand'
          aria-label='Ir al inicio'
        >
          <img
            src={logoMood}
            alt='Mood Logo'
            className='navbar__logo'
          />
        </a>

        {/* Bloque 2: Enlaces con efecto de fondo en hover */}
        <ul className='navbar__nav'>
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

        {/* Bloque 3: Acciones */}
        <div className='navbar__actions'>
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
      </nav>
    </header>
  );
};

export default Navbar;
