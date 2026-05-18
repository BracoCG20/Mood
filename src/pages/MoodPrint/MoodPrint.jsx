import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BlurText from '../../components/BlurText/BlurText';
import FadeContent from '../../components/FadeContent/FadeContent';
import './MoodPrint.scss';

// Mock data temporal de los proyectos
const PROJECTS = [
  {
    id: 1,
    title: 'AutoStar',
    category: 'Rebranding & Estrategia Digital',
    image:
      'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Grupo Bahía',
    category: 'Desarrollo Web & UX/UI',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Santa Ana',
    category: 'Social Media & Contenido',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'iShop',
    category: 'Campaña de Lanzamiento',
    image:
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80',
  },
];

const MoodPrint = () => {
  return (
    <main className='mood-print'>
      <Navbar />

      {/* --- HERO DEL PORTAFOLIO --- */}
      <section className='mood-print__hero'>
        <div className='mood-print__container'>
          <div className='mood-print__header'>
            <BlurText
              text='Nuestro'
              delay={30}
              animateBy='words'
              direction='top'
              as='h1'
              className='mood-print__title mood-print__title--light'
            />
            <BlurText
              text='Trabajo.'
              delay={50}
              animateBy='words'
              direction='top'
              as='h1'
              className='mood-print__title'
            />
          </div>

          <FadeContent
            duration={1}
            delay={0.4}
          >
            <p className='mood-print__subtitle'>
              Donde la lógica cinética y la creatividad pura se encuentran para
              hacer destacar a tu marca.
            </p>
          </FadeContent>
        </div>
      </section>

      {/* --- GALERÍA DE PROYECTOS --- */}
      <section className='mood-print__gallery'>
        <div className='mood-print__container'>
          <div className='mood-print__grid'>
            {PROJECTS.map((project, index) => (
              <FadeContent
                key={project.id}
                duration={0.8}
                delay={0.1 * index}
              >
                <div className='project-card'>
                  <div className='project-card__image-wrapper'>
                    <img
                      src={project.image}
                      alt={`Proyecto ${project.title}`}
                      className='project-card__image'
                      crossOrigin='anonymous'
                      referrerPolicy='no-referrer'
                    />
                  </div>
                  <div className='project-card__info'>
                    <h3 className='project-card__title'>{project.title}</h3>
                    <span className='project-card__category'>
                      {project.category}
                    </span>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MoodPrint;
