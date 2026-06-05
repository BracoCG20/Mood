import { Search, Zap, Sparkles } from 'lucide-react';
import FadeContent from '../FadeContent/FadeContent';
import BlurText from '../BlurText/BlurText';
import { useTranslation } from 'react-i18next'; // <-- IMPORTAMOS EL HOOK
import './MoodApproach.scss';

// 🌟 Solo guardamos los IDs y los componentes de Iconos.
const APPROACH_DATA = [
  {
    id: 'analiza',
    icon: Search,
  },
  {
    id: 'acelera',
    icon: Zap,
  },
  {
    id: 'optimiza',
    icon: Sparkles,
  },
];

const MoodApproach = () => {
  const { t } = useTranslation(); // <-- INICIALIZAMOS EL HOOK

  return (
    <section className='mood-approach'>
      <div className='mood-approach__container'>
        {/* 🌟 CABECERA */}
        <div className='mood-approach__header'>
          {/* Lado Izquierdo */}
          <div className='mood-approach__header-left'>
            <FadeContent
              duration={0.8}
              delay={0.1}
              direction='right'
            >
              <div className='mood-approach__badge'>
                <span className='mood-approach__badge-dot'></span>
                {t('moodApproach.badge')} {/* <-- TRADUCCIÓN */}
              </div>
            </FadeContent>
          </div>

          {/* Lado Derecho */}
          <div className='mood-approach__header-right'>
            {/* 🌟 TÍTULO EN 2 LÍNEAS TRADUCIDO */}
            <h2 className='mood-approach__title'>
              <span className='mood-approach__title-line'>
                <BlurText
                  text={t('moodApproach.title1')} // <-- TRADUCCIÓN LÍNEA 1
                  as='span'
                  delay={30}
                  animateBy='words'
                  direction='top'
                />
              </span>
              <span className='mood-approach__title-line'>
                <BlurText
                  text={t('moodApproach.title2')} // <-- TRADUCCIÓN LÍNEA 2
                  as='span'
                  delay={100}
                  animateBy='words'
                  direction='top'
                />
              </span>
            </h2>

            <FadeContent
              duration={0.8}
              delay={0.3}
              direction='bottom'
            >
              <p className='mood-approach__description'>
                {t('moodApproach.description')} {/* <-- TRADUCCIÓN */}
              </p>
            </FadeContent>
          </div>
        </div>

        {/* 🌟 GRILLA DE TARJETAS */}
        <div className='mood-approach__grid'>
          {APPROACH_DATA.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <FadeContent
                key={card.id}
                duration={0.8}
                delay={0.2 * (index + 1)}
                direction='bottom'
              >
                <div className='mood-approach__card'>
                  <div className='mood-approach__card-icon'>
                    <IconComponent
                      size={32}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className='mood-approach__card-content'>
                    <span className='mood-approach__card-overline'>
                      {/* TRADUCCIÓN DINÁMICA DEL OVERLINE */}
                      {t(`moodApproach.cards.${card.id}.overline`)}
                    </span>
                    <h3 className='mood-approach__card-title'>
                      {/* TRADUCCIÓN DINÁMICA DEL TÍTULO */}
                      {t(`moodApproach.cards.${card.id}.title`)}
                    </h3>
                    <p className='mood-approach__card-desc'>
                      {/* TRADUCCIÓN DINÁMICA DE LA DESCRIPCIÓN */}
                      {t(`moodApproach.cards.${card.id}.description`)}
                    </p>
                  </div>
                </div>
              </FadeContent>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoodApproach;
