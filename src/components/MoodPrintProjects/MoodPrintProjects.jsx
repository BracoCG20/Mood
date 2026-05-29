import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FadeContent from '../FadeContent/FadeContent';
import Masonry from '../Masonry/Masonry';
import ProjectModal from '../ProjectModal/ProjectModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MoodPrintProjects.scss';

gsap.registerPlugin(ScrollTrigger);

const MoodPrintProjects = ({ selectedCategory }) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  // 🌟 NUEVO: Estados para manejar los datos dinámicos
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 NUEVO: Hacemos Fetch a la Base de Datos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();

        // Filtramos solo los que están activos (para no mostrar los ocultos por el Admin)
        // y adaptamos las claves de la BD ('img_url') a lo que espera Masonry ('img' y 'height')
        const activeProjects = data
          .filter((project) => project.is_active)
          .map((project) => ({
            ...project,
            img: project.img_url, // Masonry necesita la prop 'img'
            // Asignamos alturas aleatorias entre 500 y 800 para el estilo Masonry
            // (Si en el futuro guardas el ancho/alto real de la imagen en BD, puedes usarlo aquí)
            height: Math.floor(Math.random() * (800 - 500 + 1)) + 500,
            url: project.project_url || '#',
          }));

        setProjectsData(activeProjects);
      } catch (error) {
        console.error('Error al cargar proyectos desde la BD:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Lógica de Filtrado Dinámico
  const baseFilteredProjects =
    selectedCategory === 'Todos'
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  // Traducción y adaptación de los datos filtrados
  const filteredProjects = baseFilteredProjects.map((project) => ({
    ...project,
    // Usamos el título y descripción reales de la BD, o un fallback si está vacío
    title: project.title,
    description: project.description || 'Sin descripción detallada.',
    categoryTranslated:
      t(`moodPrintHero.categories.${project.category}`) || project.category,
  }));

  // Bloqueo de scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Observer para recalcular dimensiones de GSAP ScrollTrigger
  useEffect(() => {
    let resizeObserver;

    const safeRefresh = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    const gridContainer = document.querySelector('.mood-projects__grid');

    if (gridContainer && !isLoading) {
      resizeObserver = new ResizeObserver(() => {
        safeRefresh();
      });
      resizeObserver.observe(gridContainer);
    }

    safeRefresh();

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      ScrollTrigger.refresh();
    };
  }, [selectedCategory, isLoading]);

  return (
    <section className='mood-projects'>
      <div className='mood-projects__container'>
        <div className='mood-projects__header'>
          <FadeContent
            key={selectedCategory}
            duration={0.8}
            delay={0.1}
            direction='bottom'
          >
            <h2 className='mood-projects__title'>
              {t(`moodPrintProjects.categoryInfo.${selectedCategory}.title`)}
            </h2>
            <p className='mood-projects__description'>
              {t(`moodPrintProjects.categoryInfo.${selectedCategory}.desc`)}
            </p>
          </FadeContent>
        </div>

        <div className='mood-projects__grid'>
          {isLoading ? (
            // 🌟 Estado de Carga
            <p
              style={{ textAlign: 'center', marginTop: '4rem', color: 'gray' }}
            >
              Cargando proyectos espectaculares...
            </p>
          ) : filteredProjects.length > 0 ? (
            // 🌟 Renderizado de Masonry con datos reales
            <Masonry
              key={selectedCategory}
              items={filteredProjects}
              ease='power3.out'
              duration={0.8}
              stagger={0.08}
              animateFrom='bottom'
              scaleOnHover={true}
              hoverScale={0.96}
              blurToFocus={true}
              colorShiftOnHover={false}
              onItemClick={(project) => setSelectedProject(project)}
            />
          ) : (
            // 🌟 Estado Vacío
            <p
              style={{ textAlign: 'center', marginTop: '4rem', color: 'gray' }}
            >
              {t('moodPrintProjects.emptyState')}
            </p>
          )}
        </div>
      </div>

      {/* MODAL DEL PROYECTO */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default MoodPrintProjects;
