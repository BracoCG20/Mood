//src/components/MoodMindMotto/MoodMindMotto.jsx
import { useRef, useState, useLayoutEffect } from 'react';
import FadeContent from '../FadeContent/FadeContent';
import VariableProximity from '../VariableProximity/VariableProximity';
import logoMoodBg from '../../assets/Logo_Mood_Vectorizado.svg';
import './MoodMindMotto.scss';

const MoodMindMotto = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // 🌟 LÓGICA DINÁMICA: Observamos el tamaño exacto del contenedor
  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      if (element) {
        const rect = element.getBoundingClientRect();
        setContainerSize({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateSize(); // Llamada inicial forzada
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // 🌟 FUNCIÓN MATEMÁTICA: Genera el recorte (Notch) en el CENTRO
  const getDynamicPath = (w, h) => {
    if (w === 0 || h === 0) return '';

    const isMobile = w < 768;
    const r = isMobile ? 32 : 48; // Radio principal (esquinas externas del contenedor)
    const nh = isMobile ? 30 : 60; // Alto del recorte
    const nr = isMobile ? 16 : 24; // Radio interno de las curvas del recorte

    // Ancho del recorte: Intentamos 950px en desktop para que entre un navbar ancho,
    // pero lo limitamos matemáticamente para que no rompa si la pantalla es más pequeña.
    const maxNw = w - (r + nr) * 2 - 40;
    const nw = Math.min(isMobile ? 320 : 950, maxNw);

    // Puntos X inicial y final del recorte en el centro
    const cx = w / 2;
    const x1 = cx - nw / 2;
    const x2 = cx + nw / 2;

    return `
      M ${r} 0
      L ${x1 - nr} 0
      A ${nr} ${nr} 0 0 1 ${x1} ${nr}
      L ${x1} ${nh - nr}
      A ${nr} ${nr} 0 0 0 ${x1 + nr} ${nh}
      L ${x2 - nr} ${nh}
      A ${nr} ${nr} 0 0 0 ${x2} ${nh - nr}
      L ${x2} ${nr}
      A ${nr} ${nr} 0 0 1 ${x2 + nr} 0
      L ${w - r} 0
      A ${r} ${r} 0 0 1 ${w} ${r}
      L ${w} ${h - r}
      A ${r} ${r} 0 0 1 ${w - r} ${h}
      L ${r} ${h}
      A ${r} ${r} 0 0 1 0 ${h - r}
      L 0 ${r}
      A ${r} ${r} 0 0 1 ${r} 0
      Z
    `
      .replace(/\s+/g, ' ')
      .trim();
  };

  const dynamicClipPath = getDynamicPath(
    containerSize.width,
    containerSize.height,
  );

  return (
    <section className='mood-mind-motto'>
      <div
        className='mood-mind-motto__container'
        ref={containerRef}
        style={{
          clipPath: dynamicClipPath ? `path('${dynamicClipPath}')` : 'none',
        }}
      >
        {/* LOGO EN LA ESQUINA INFERIOR DERECHA */}
        <img
          src={logoMoodBg}
          alt='Logo Mood'
          className='mood-mind-motto__logo'
          aria-hidden='true'
        />

        <FadeContent
          duration={1}
          delay={0.2}
          direction='bottom'
        >
          <h2 className='mood-mind-motto__text'>
            <span className='mood-mind-motto__line'>
              <VariableProximity
                label='NUESTRO MOOD'
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef}
                radius={150}
                falloff='gaussian'
              />
            </span>
            <span className='mood-mind-motto__line'>
              <VariableProximity
                label='ES SIEMPRE'
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef}
                radius={150}
                falloff='gaussian'
              />
            </span>
            <span className='mood-mind-motto__line mood-mind-motto__line--inline'>
              <VariableProximity
                label='ESTAR AL D'
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef}
                radius={150}
                falloff='gaussian'
              />
              <span className='mood-mind-motto__highlight'>
                <VariableProximity
                  label='IA'
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={150}
                  falloff='gaussian'
                />
              </span>
            </span>
          </h2>
        </FadeContent>
      </div>
    </section>
  );
};

export default MoodMindMotto;
