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

const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentTitle = useRef(document.title);

  // 1. Efecto para cambiar el título según la página (Ruta)
  useEffect(() => {
    let newTitle = 'Mood | Agencia Digital Creativa';

    // Tip: Hemos envuelto los títulos en 't()' por si deseas agregarlos a tu JSON luego.
    // Si la traducción no existe, usará el texto en español por defecto que está a la derecha.
    switch (location.pathname) {
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

    // Aplicamos el nuevo título
    document.title = newTitle;

    // Actualizamos la referencia para que el efecto de visibilidad sepa a qué título regresar
    currentTitle.current = newTitle;

    // Escuchamos location.pathname (cambio de página) e i18n.language (cambio de idioma)
  }, [location.pathname, t, i18n.language]);

  // 2. Efecto para cuando el usuario cambia de pestaña en el navegador
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Muestra el mensaje para captar la atención
        document.title =
          t('tab.hidden') || '¡Vuelve! Las buenas ideas te esperan 💡';
      } else {
        // SOLUCIÓN: Restaura instantáneamente el título exacto en el que se quedó el usuario
        document.title = currentTitle.current;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [t]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* =========================================
            RUTAS PÚBLICAS (ACCESIBLES PARA TODOS)
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
      </Routes>
    </>
  );
};

export default App;
