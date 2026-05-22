import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BlurText from '../BlurText/BlurText';
import ContactForm from './ContactForm';
import './ContactHero.scss';

const ContactHero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // <-- Nuevo: controla el desvanecimiento de salida

  const handleFormSuccess = () => {
    setShowOverlay(true);

    // 1. Iniciamos el desvanecimiento de salida a los 4.7 segundos
    setTimeout(() => {
      setIsClosing(true);
    }, 4700);

    // 2. Ejecutamos la redirección final al home a los 5.5 segundos
    setTimeout(() => {
      navigate('/');
      window.scrollTo(0, 0);
    }, 5500);
  };

  return (
    <section className='contact-hero'>
      {/* Añadimos dinámicamente la clase de salida cuando isClosing sea true */}
      {showOverlay && (
        <div
          className={`water-drop-overlay ${isClosing ? 'fade-out-sequence' : ''}`}
        >
          <div className='water-drop-content'>
            <h2>{t('contactHero.form.feedback.success')}</h2>
          </div>
        </div>
      )}

      <div className='contact-hero__container'>
        <div className='contact-hero__content'>
          <div className='contact-hero__title-group'>
            <BlurText
              text={t('contactHero.title1')}
              delay={30}
              animateBy='words'
              direction='top'
              as='h1'
              className='contact-hero__title contact-hero__title--light'
            />
            <div className='contact-hero__line'>
              <BlurText
                text={t('contactHero.title2')}
                delay={45}
                animateBy='words'
                direction='top'
                as='span'
                className='contact-hero__highlight'
              />
              <BlurText
                text={t('contactHero.title3')}
                delay={60}
                animateBy='words'
                direction='top'
                as='h1'
                className='contact-hero__title'
              />
            </div>
          </div>

          <div
            className='contact-hero__fade-in'
            style={{ animationDelay: '0.4s' }}
          >
            <p className='contact-hero__subtitle'>
              {t('contactHero.subtitle')}
            </p>
          </div>
        </div>

        <div
          className='contact-hero__form-wrapper contact-hero__fade-in'
          style={{ animationDelay: '0.6s' }}
        >
          <ContactForm onSuccess={handleFormSuccess} />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
