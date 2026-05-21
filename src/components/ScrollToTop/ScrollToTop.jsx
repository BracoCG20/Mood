import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Usamos un setTimeout de 0ms o 10ms.
    // Esto obliga a React a terminar de "dibujar" todas las animaciones
    // y el layout de la nueva página ANTES de hacer el scroll.
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant', // 'instant' fuerza el salto inmediato al tope
      });
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
