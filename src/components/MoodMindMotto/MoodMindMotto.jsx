import { useRef } from 'react';
import FadeContent from '../FadeContent/FadeContent';
import VariableProximity from '../VariableProximity/VariableProximity'; // Asegúrate de tener la ruta correcta
import './MoodMindMotto.scss';

const MoodMindMotto = () => {
  // Referencia para rastrear la posición del mouse para el efecto de proximidad
  const containerRef = useRef(null);

  return (
    <section
      className='mood-mind-motto'
      ref={containerRef}
    >
      <div className='mood-mind-motto__container'>
        {/* 🌟 Revelado suave al hacer scroll hasta el final */}
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
