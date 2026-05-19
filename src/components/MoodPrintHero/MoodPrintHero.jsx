import BlurText from '../BlurText/BlurText';
import './MoodPrintHero.scss';

const CATEGORIES = [
  'Todos',
  'Branding',
  'Diseño Web',
  'Marketing Digital',
  'Social Media',
  'Contenido Audiovisual',
];

const MoodPrintHero = ({ activeCategory, onCategoryClick }) => {
  return (
    <section className='mood-print-hero'>
      <div className='mood-print-hero__container'>
        <div className='mood-print-hero__header'>
          <div className='mood-print-hero__title-group'>
            <div className='mood-print-hero__line'>
              <BlurText
                text='Creamos'
                delay={30}
                animateBy='words'
                direction='top'
                as='h1'
                className='mood-print-hero__title mood-print-hero__title--light'
              />
            </div>

            <div className='mood-print-hero__line'>
              <BlurText
                text='marcas'
                delay={45}
                animateBy='words'
                direction='top'
                as='span'
                className='mood-print-hero__highlight'
              />
              <BlurText
                text='extraordinarias.'
                delay={60}
                animateBy='words'
                direction='top'
                as='h1'
                className='mood-print-hero__title'
              />
            </div>
          </div>

          {/* REEMPLAZO DE FADECONTENT POR CLASE CSS SEGURA */}
          <div
            className='mood-print-hero__fade-in'
            style={{ animationDelay: '0.5s' }}
          >
            <p className='mood-print-hero__subtitle'>
              Explora nuestro portafolio. Selecciona una categoría para
              descubrir los proyectos que han transformado el futuro de grandes
              marcas.
            </p>
          </div>
        </div>

        {/* REEMPLAZO DE FADECONTENT POR CLASE CSS SEGURA */}
        <div
          className='mood-print-hero__categories mood-print-hero__fade-in'
          style={{ animationDelay: '0.7s' }}
        >
          <ul className='category-list'>
            {CATEGORIES.map((category, index) => (
              <li
                key={index}
                className={`category-list__item ${activeCategory === category ? 'category-list__item--active' : ''}`}
                onClick={() => onCategoryClick(category)}
              >
                <span className='category-list__text'>{category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MoodPrintHero;
