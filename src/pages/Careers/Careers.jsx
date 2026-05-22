import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Rocket,
  Brain,
  Coffee,
  Briefcase,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import BlurText from '../../components/BlurText/BlurText';
import './Careers.scss';

const Careers = () => {
  const { t } = useTranslation();

  // Obtenemos la lista. Si falla, devolvemos un arreglo vacío [] por seguridad.
  const rawJobs = t('careers.jobs.list', { returnObjects: true });
  const jobsList = Array.isArray(rawJobs) ? rawJobs : [];

  return (
    <main className='careers-page'>
      {/* HERO SECTION */}
      <section className='careers-hero'>
        <div className='careers-hero__container'>
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
          <div
            className='careers-hero__fade-in'
            style={{ animationDelay: '0.4s' }}
          >
            <p className='careers-hero__subtitle'>
              {t('careers.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section className='careers-culture'>
        <div className='careers-culture__container'>
          <h2 className='careers-culture__title'>
            {t('careers.culture.title')}
          </h2>
          <div className='careers-culture__grid'>
            <div className='culture-card'>
              <Brain className='culture-card__icon' />
              <h3>{t('careers.culture.items.1.title')}</h3>
              <p>{t('careers.culture.items.1.desc')}</p>
            </div>
            <div className='culture-card'>
              <Rocket className='culture-card__icon' />
              <h3>{t('careers.culture.items.2.title')}</h3>
              <p>{t('careers.culture.items.2.desc')}</p>
            </div>
            <div className='culture-card'>
              <Coffee className='culture-card__icon' />
              <h3>{t('careers.culture.items.3.title')}</h3>
              <p>{t('careers.culture.items.3.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS SECTION */}
      <section className='careers-jobs'>
        <div className='careers-jobs__container'>
          <h2>{t('careers.jobs.title')}</h2>

          <div className='careers-jobs__grid'>
            {jobsList.length > 0 ? (
              jobsList.map((job) => (
                <div
                  className='job-card'
                  key={job.id}
                >
                  <div className='job-card__header'>
                    <h3 className='job-card__title'>{job.title}</h3>
                    <div className='job-card__meta'>
                      <span className='job-card__tag'>
                        <Briefcase size={16} /> {job.type}
                      </span>
                      <span className='job-card__tag'>
                        <Calendar size={16} /> {job.date}
                      </span>
                    </div>
                  </div>

                  {/* Botón de redirección a la ruta dinámica */}
                  <Link
                    to={`/trabaja-con-nosotros/${job.id}`}
                    className='job-card__btn'
                  >
                    {t('careers.jobs.cta')} <ChevronRight size={18} />
                  </Link>
                </div>
              ))
            ) : (
              <div className='careers-jobs__empty-state'>
                <p>{t('careers.jobs.empty')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
