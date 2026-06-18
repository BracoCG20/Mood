// src/components/Careers/CareersHero.jsx
import { useTranslation } from 'react-i18next';
import { Rocket, Brain, Coffee } from 'lucide-react';
import BlurText from '../BlurText/BlurText';
import cultureData from '../../data/careersCulture.json';
import './CareersHero.scss';

// Diccionario para mapear los nombres de iconos en el JSON a componentes de Lucide
const iconMap = {
  Brain,
  Rocket,
  Coffee,
};

/**
 * Componente CareersHero.
 * Renderiza el banner principal de la bolsa de trabajo.
 * En escritorio, las tarjetas de cultura se apilan asimétricamente en una columna.
 * En tablet, utilizan flex-wrap para colocar 2 arriba y 1 centrada abajo.
 * En móvil, se apilan en una sola columna.
 */
const CareersHero = () => {
  const { t } = useTranslation();

  return (
    <section className='careers-hero'>
      <div className='careers-hero__background'>
        <div className='careers-hero__container'>
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <div className='careers-hero__left-col'>
            <div className='careers-hero__title-group'>
              <BlurText
                text={t('careers.hero.title1')}
                delay={30}
                animateBy='words'
                direction='top'
                as='h1'
                className='careers-hero__title'
              />
              <BlurText
                text={t('careers.hero.title2')}
                delay={45}
                animateBy='words'
                direction='top'
                as='span'
                className='careers-hero__highlight'
              />
            </div>

            <div className='careers-hero__fade-in careers-hero__fade-in--delay-1'>
              <p className='careers-hero__subtitle'>
                {t('careers.hero.subtitle')}
              </p>
            </div>
          </div>

          {/* Columna Derecha: Tarjetas de Cultura Corporativa */}
          <div className='careers-hero__right-col careers-hero__fade-in careers-hero__fade-in--delay-2'>
            <h2 className='careers-hero__culture-title'>
              {t('careers.culture.title')}
            </h2>

            <div className='careers-hero__culture-grid'>
              <div className='careers-hero__culture-track'>
                {cultureData.map((item) => {
                  const IconComponent = iconMap[item.iconName];

                  return (
                    <div
                      key={item.id}
                      className='culture-card'
                    >
                      {IconComponent && (
                        <IconComponent className='culture-card__icon' />
                      )}
                      <div className='culture-card__info'>
                        <h3>{t(`careers.culture.items.${item.id}.title`)}</h3>
                        <p>{t(`careers.culture.items.${item.id}.desc`)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
