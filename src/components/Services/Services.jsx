import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import BlurText from '../BlurText/BlurText';
import FadeContent from '../FadeContent/FadeContent';
import './Services.scss';

const SERVICES_DATA = [
  {
    id: 'branding',
    title: 'Branding',
    description:
      'Construimos identidades memorables que conectan profundamente con tu audiencia. No solo creamos logos, diseñamos la esencia y el alma de tu marca para que destaque con autoridad en un mercado saturado.',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'web',
    title: 'Diseño Web',
    description:
      'Desarrollamos plataformas digitales ultrarrápidas, intuitivas y centradas en la conversión. Tu sitio web no será solo un escaparate bonito, será tu mejor y más rentable herramienta de ventas 24/7.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description:
      'Estrategias basadas en datos que multiplican tu ROI. Dominamos el ecosistema digital para posicionar tu mensaje y tus ofertas exactamente donde y cuando están tus clientes potenciales.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'social',
    title: 'Social Media',
    description:
      'Transformamos simples seguidores en embajadores de marca. Creamos comunidades activas mediante contenido auténtico y estrategias de interacción que generan impacto real y lealtad.',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'audiovisual',
    title: 'Contenido AudioVisual',
    description:
      'Contamos la historia de tu marca a través de narrativas visuales de alto impacto. Producción de video y fotografía cinematográfica que capturan la atención desde el primer segundo.',
    image:
      'https://images.unsplash.com/photo-1660326269462-b3a6b6743ea6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(SERVICES_DATA[0]);

  return (
    <section
      className='services'
      id='servicios'
    >
      <div className='services__container'>
        <div className='services__header'>
          <h2 className='services__title'>
            Potenciamos tu <span className='services__highlight'>marca</span>
          </h2>
          <p className='services__description'>
            Soluciones creativas estructuradas con lógica cinética para impulsar
            tu marca en el entorno digital.
          </p>
        </div>

        <div className='services__body'>
          <div className='services__info'>
            <BlurText
              key={`title-${activeService.id}`}
              text={activeService.title}
              delay={30}
              animateBy='words'
              direction='top'
              as='h3'
              className='services__info-title'
            />

            <FadeContent
              key={`desc-${activeService.id}`}
              duration={0.6}
              delay={0.1}
            >
              <p className='services__info-desc'>{activeService.description}</p>
            </FadeContent>

            <motion.button
              key={`btn-${activeService.id}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className='btn-service'
            >
              <span>Ver proyectos</span>
              <ArrowRight
                size={18}
                strokeWidth={2}
              />
            </motion.button>
          </div>

          <div className='services__gallery'>
            {SERVICES_DATA.map((service) => {
              const isActive = activeService.id === service.id;

              return (
                <motion.div
                  layout
                  key={service.id}
                  className={`services__card ${isActive ? 'services__card--active' : ''}`}
                  onClick={() => setActiveService(service)}
                  style={{ backgroundImage: `url(${service.image})` }}
                  role='button'
                  aria-label={`Ver detalles de ${service.title}`}
                  transition={{
                    layout: { type: 'spring', stiffness: 200, damping: 25 },
                  }}
                />
                // Hemos eliminado todo el contenido interno (textos y overlays)
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
