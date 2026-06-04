import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react';
import BlurText from '../BlurText/BlurText';
import './MoodMindWorkflow.scss';

// Hemos agrupado tus textos en 4 pilares clave
const WORKFLOW_DATA = [
  {
    id: 'rapida',
    title: 'Producción más rápida',
    bullets: [
      'La IA reduce tiempos en edición, retoque, mockups, renders y adaptaciones.',
      'Mockups, renders y key visuals en horas, no semanas.',
      'Mood convierte esa velocidad en piezas listas para campaña.',
    ],
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'precisa',
    title: 'Producción precisa y eficiente',
    bullets: [
      'La IA detecta formatos, tendencias y performance.',
      'Menos reprocesos y menos pruebas innecesarias.',
      'Mood adapta cada pieza al canal correcto (RRSS, pauta, B2B, retail, eventos).',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'ahorro',
    title: 'Ahorro estructural real',
    bullets: [
      'Menos inversión en modelos, casting, honorarios y viáticos.',
      'Disminución de alquiler de equipos, sets físicos y locaciones.',
      'Se invierte más en pauta y performance, no en costos operativos.',
    ],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'creativa',
    title: 'Creatividad sin límites físicos',
    bullets: [
      'Escenarios imposibles sin mover un equipo de producción.',
      'Versiones múltiples de una misma campaña y testing visual previo.',
      'La IA genera rutas visuales; Mood selecciona y eleva la idea estratégicamente.',
    ],
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
  },
];

const MoodMindWorkflow = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🌟 SEGUIMIENTO DEL SCROLL
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 🌟 ACTUALIZAMOS EL SLIDE SEGÚN EL PORCENTAJE DEL SCROLL
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Multiplicamos por la cantidad de slides para saber en cuál estamos
    // Se usa 3.99 para evitar que salte a un índice 4 inexistente al llegar al 100%
    const newIndex = Math.floor(latest * 3.99);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    // El contenedor mide 400vh para permitir el scroll
    <section
      className='mood-mind-workflow'
      ref={containerRef}
    >
      {/* Contenedor Sticky que se queda fijo en la pantalla */}
      <div className='mood-mind-workflow__sticky'>
        <div className='mood-mind-workflow__container'>
          {/* 🌟 HEADER GIGANTE */}
          <div className='mood-mind-workflow__header'>
            <div className='mood-mind-workflow__badge'>
              <span className='mood-mind-workflow__badge-dot'></span>
              MOOD WORKFLOW
            </div>
            <h2 className='mood-mind-workflow__title'>
              Producción impulsada por IA
            </h2>
          </div>

          {/* 🌟 SECCIÓN DIVIDIDA (IMAGEN Y TEXTOS) */}
          <div className='mood-mind-workflow__split'>
            {/* LADO IZQUIERDO: IMAGEN CON ANIMACIÓN DE MÁSCARA */}
            <div className='mood-mind-workflow__image-wrapper'>
              <AnimatePresence mode='popLayout'>
                <motion.img
                  key={activeIndex}
                  src={WORKFLOW_DATA[activeIndex].image}
                  alt={WORKFLOW_DATA[activeIndex].title}
                  className='mood-mind-workflow__image'
                  // 🌟 MAGIA: Animación del centro hacia afuera y escalando
                  initial={{
                    clipPath: 'inset(50% round 16px)',
                    scale: 1.3,
                    opacity: 0,
                  }}
                  animate={{
                    clipPath: 'inset(0% round 16px)',
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Curva súper suave
                />
              </AnimatePresence>
            </div>

            {/* LADO DERECHO: TEXTOS Y BARRITA */}
            <div className='mood-mind-workflow__content'>
              {/* BARRITA DE PROGRESO */}
              <div className='mood-mind-workflow__progress-track'>
                <motion.div
                  className='mood-mind-workflow__progress-fill'
                  style={{ scaleX: scrollYProgress }} // Se llena con el scroll
                />
              </div>

              <div className='mood-mind-workflow__info'>
                {/* NÚMERO DEL SLIDE */}
                <div className='mood-mind-workflow__number'>
                  0{activeIndex + 1}
                </div>

                {/* TÍTULO Y BULLETS */}
                <div className='mood-mind-workflow__details'>
                  {/* BlurText requiere cambiar la key para re-animarse */}
                  <div className='mood-mind-workflow__slide-title'>
                    <BlurText
                      key={`title-${activeIndex}`}
                      text={WORKFLOW_DATA[activeIndex].title}
                      delay={30}
                      animateBy='words'
                      direction='top'
                    />
                  </div>

                  <AnimatePresence mode='wait'>
                    <motion.ul
                      key={`desc-${activeIndex}`}
                      className='mood-mind-workflow__bullets'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {WORKFLOW_DATA[activeIndex].bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodMindWorkflow;
