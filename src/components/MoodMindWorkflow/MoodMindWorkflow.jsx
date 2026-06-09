//src/components/MoodMindWorkflow/MoodMindWorkflow.jsx
import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react';
import BlurText from '../BlurText/BlurText';
import { useTranslation } from 'react-i18next'; // <-- IMPORTAMOS EL HOOK
import './MoodMindWorkflow.scss';

// 🌟 Ahora solo guardamos los IDs y las imágenes.
// Los textos vivirán en los archivos de traducción JSON.
const WORKFLOW_DATA = [
  {
    id: 'rapida',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'precisa',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'ahorro',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'creativa',
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
  },
];

const MoodMindWorkflow = () => {
  const { t } = useTranslation(); // <-- INICIALIZAMOS EL HOOK
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🌟 SEGUIMIENTO DEL SCROLL
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 🌟 ACTUALIZAMOS EL SLIDE SEGÚN EL PORCENTAJE DEL SCROLL
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.floor(latest * 3.99);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  // 🌟 VARIABLES DINÁMICAS DE TRADUCCIÓN PARA EL SLIDE ACTUAL
  const currentSlideId = WORKFLOW_DATA[activeIndex].id;
  const currentTitle = t(`moodMindWorkflow.slides.${currentSlideId}.title`);
  // Usamos returnObjects: true para poder mapear un arreglo que viene del JSON
  const currentBullets =
    t(`moodMindWorkflow.slides.${currentSlideId}.bullets`, {
      returnObjects: true,
    }) || [];

  return (
    <section
      className='mood-mind-workflow'
      ref={containerRef}
    >
      <div className='mood-mind-workflow__sticky'>
        <div className='mood-mind-workflow__container'>
          {/* 🌟 HEADER GIGANTE */}
          <div className='mood-mind-workflow__header'>
            <div className='mood-mind-workflow__badge'>
              <span className='mood-mind-workflow__badge-dot'></span>
              {t('moodMindWorkflow.badge')} {/* <-- TRADUCCIÓN */}
            </div>
            <h2 className='mood-mind-workflow__title'>
              {t('moodMindWorkflow.title')} {/* <-- TRADUCCIÓN */}
            </h2>
          </div>

          <div className='mood-mind-workflow__split'>
            {/* LADO IZQUIERDO: IMAGEN */}
            <div className='mood-mind-workflow__image-wrapper'>
              <AnimatePresence mode='popLayout'>
                <motion.img
                  key={activeIndex}
                  src={WORKFLOW_DATA[activeIndex].image}
                  alt={currentTitle} // <-- Alt dinámico
                  className='mood-mind-workflow__image'
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
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
            </div>

            {/* LADO DERECHO: TEXTOS Y BARRITA */}
            <div className='mood-mind-workflow__content'>
              <div className='mood-mind-workflow__progress-track'>
                <motion.div
                  className='mood-mind-workflow__progress-fill'
                  style={{ scaleX: scrollYProgress }}
                />
              </div>

              <div className='mood-mind-workflow__info'>
                <div className='mood-mind-workflow__number'>
                  0{activeIndex + 1}
                </div>

                <div className='mood-mind-workflow__details'>
                  <div className='mood-mind-workflow__slide-title'>
                    <BlurText
                      key={`title-${activeIndex}`}
                      text={currentTitle} // <-- Título traducido dinámicamente
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
                      {/* 🌟 MAPEAMOS LOS BULLETS TRADUCIDOS */}
                      {currentBullets.map((bullet, i) => (
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
