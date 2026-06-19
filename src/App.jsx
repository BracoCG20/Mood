// src/App.jsx
import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// --- Páginas Públicas ---
import Home from './pages/Home/Home';
import AdnMood from './pages/AdnMood/AdnMood';
import MoodPrint from './pages/MoodPrint/MoodPrint';
import MoodMind from './pages/MoodMind/MoodMind';
import Contact from './pages/Contact/Contact';
import Careers from './pages/Careers/Careers';
import NotFound from './pages/NotFound/NotFound';

/**
 * Componente que sincroniza la URL con el idioma de i18next.
 * Si el usuario entra a una ruta con /en/, cambia el idioma a inglés automáticamente.
 */
const LanguageSync = ({ children }) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Detectamos si la URL actual empieza por /en
    const isEnglishUrl =
      location.pathname === '/en' || location.pathname.startsWith('/en/');

    if (isEnglishUrl && i18n.language !== 'en') {
      i18n.changeLanguage('en');
    } else if (!isEnglishUrl && i18n.language !== 'es') {
      i18n.changeLanguage('es');
    }
  }, [location.pathname, i18n]);

  return children;
};

const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentTitle = useRef(document.title);

  // 1. Efecto para cambiar el título según la página (Ruta)
  useEffect(() => {
    // Limpiamos el prefijo '/en' para que el switch reconozca la ruta base
    const cleanPath = location.pathname.replace(/^\/en/, '') || '/';
    let newTitle = 'Mood | Agencia Digital Creativa';

    switch (cleanPath) {
      case '/':
        newTitle = t('titles.home', 'Mood | Agencia Digital Creativa');
        break;
      case '/adn-mood':
        newTitle = t('titles.adn', 'ADN Mood | Agencia Digital Creativa');
        break;
      case '/mood-print':
        newTitle = t('titles.print', 'Mood Print | Agencia Digital Creativa');
        break;
      case '/mood-mind':
        newTitle = t('titles.mind', '#MoodMind | Agencia Digital Creativa');
        break;
      case '/contacto':
        newTitle = t('titles.contact', 'Contacto | Agencia Digital Creativa');
        break;
      case '/trabaja_con_nosotros':
        newTitle = t(
          'titles.careers',
          'Trabaja con Nosotros | Agencia Digital Creativa',
        );
        break;
      default:
        newTitle = t('titles.home', 'Mood | Agencia Digital Creativa');
    }

    document.title = newTitle;
    currentTitle.current = newTitle;
  }, [location.pathname, t, i18n.language]);

  // 2. Efecto para cuando el usuario cambia de pestaña
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title =
          t('tab.hidden') || '¡Vuelve! Las buenas ideas te esperan 💡';
      } else {
        document.title = currentTitle.current;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [t]);

  return (
    <LanguageSync>
      <ScrollToTop />
      <Routes>
        {/* =========================================
            RUTAS EN ESPAÑOL (Por defecto)
            ========================================= */}
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/adn-mood'
          element={<AdnMood />}
        />
        <Route
          path='/mood-print'
          element={<MoodPrint />}
        />
        <Route
          path='/mood-mind'
          element={<MoodMind />}
        />
        <Route
          path='/contacto'
          element={<Contact />}
        />
        <Route
          path='/trabaja_con_nosotros'
          element={<Careers />}
        />

        {/* =========================================
            RUTAS EN INGLÉS (Prefijo /en)
            ========================================= */}
        <Route
          path='/en'
          element={<Home />}
        />
        <Route
          path='/en/adn-mood'
          element={<AdnMood />}
        />
        <Route
          path='/en/mood-print'
          element={<MoodPrint />}
        />
        <Route
          path='/en/mood-mind'
          element={<MoodMind />}
        />
        <Route
          path='/en/contacto'
          element={<Contact />}
        />
        <Route
          path='/en/trabaja_con_nosotros'
          element={<Careers />}
        />
        {/* =========================================
            RUTAS EN INGLÉS (Prefijo /en)
            ========================================= */}
        <Route
          path='/en/*'
          element={<NotFound />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </LanguageSync>
  );
};

export default App;
