import { useTranslation } from 'react-i18next';
import FadeContent from '../FadeContent/FadeContent';
import LightRays from '../LightRays/LightRays';
import logoMoodBg from '../../assets/Logo_Mood_Vectorizado.svg';
import './MoodMindHero.scss';

const AI_LOGOS = [
  { src: '/Logos/ChatGPT.svg', alt: 'ChatGPT' },
  { src: '/Logos/Deepl.webp', alt: 'DeepL' },
  { src: '/Logos/ElevenLabs.webp', alt: 'ElevenLabs' },
  { src: '/Logos/Envato.svg', alt: 'Envato' },
  { src: '/Logos/KlingAI.svg', alt: 'KlingAI' },
  { src: '/Logos/Krea.webp', alt: 'Krea' },
  { src: '/Logos/Magnific.webp', alt: 'Magnific' },
  { src: '/Logos/Midjourney.svg', alt: 'Midjourney' },
];

const MoodMindHero = () => {
  const { t } = useTranslation();

  return (
    <section className='mood-mind-hero'>
      {/* 🌟 FONDO INTERACTIVO LIGHT RAYS */}
      <div className='mood-mind-hero__bg'>
        <LightRays
          raysOrigin='top-center'
          raysColor='#4ade80'
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className='custom-rays'
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* 🌟 LOGO GIGANTE DE FONDO (MARCA DE AGUA) */}
      <img
        src={logoMoodBg}
        alt=''
        className='mood-mind-hero__bg-logo'
        aria-hidden='true'
      />

      <div className='mood-mind-hero__container'>
        <div className='mood-mind-hero__content'>
          <FadeContent
            duration={0.8}
            delay={0.1}
            direction='bottom'
          >
            <h1 className='mood-mind-hero__title'>
              NUESTRO MOOD <br />
              ES SIEMPRE ESTAR AL D
              <span className='mood-mind-hero__title-white'>IA</span>
            </h1>
          </FadeContent>

          {/* 🌟 LOGOS ESTÁTICOS DE IA (Forzados a 2 líneas en CSS) */}
          <FadeContent
            duration={0.8}
            delay={0.3}
            direction='bottom'
          >
            <div className='mood-mind-hero__ai-logos'>
              {AI_LOGOS.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.alt}
                />
              ))}
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
};

export default MoodMindHero;
