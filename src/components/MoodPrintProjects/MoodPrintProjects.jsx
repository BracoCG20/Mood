import { useState, useEffect } from 'react';
import FadeContent from '../FadeContent/FadeContent';
import Masonry from '../Masonry/Masonry';
import ProjectModal from '../ProjectModal/ProjectModal'; // <-- IMPORTAMOS EL MODAL
import './MoodPrintProjects.scss';

// ... (Aquí van tus const PROJECTS_DATA y CATEGORY_INFO intactos) ...
const PROJECTS_DATA = [
  {
    id: '1',
    category: 'Branding',
    title: 'Rebranding Integral',
    client: 'AutoStar Motors',
    date: 'Octubre 2023',
    description:
      'Desarrollamos una nueva identidad visual que transmite innovación y confianza. El proyecto incluyó desde el rediseño del logotipo hasta la implementación del manual de marca en todos los puntos de contacto digitales.',
    img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    height: 700,
    url: 'https://ejemplo.com',
  },
  {
    id: '2',
    category: 'Diseño Web',
    title: 'E-commerce Deportivo',
    client: 'Grupo Bahía',
    date: 'Enero 2024',
    description:
      'Diseño y desarrollo de una plataforma e-commerce ultra rápida y optimizada para conversión, reduciendo la tasa de abandono en un 40% durante el primer mes.',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    height: 500,
    url: 'https://ejemplo.com',
  },
  {
    id: '3',
    category: 'Marketing Digital',
    title: 'Campaña "El Nuevo Horizonte"',
    client: 'Marcan',
    date: 'Marzo 2024',
    description:
      'Estrategia integral de pauta digital que combinó Google Ads y Meta Ads, logrando un alcance de más de 2 millones de impresiones y un ROI superior al 300%.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    height: 900,
    url: 'https://ejemplo.com',
  },
  {
    id: '4',
    category: 'Social Media',
    title: 'Lanzamiento Colección Verano',
    client: 'Santa Ana',
    date: 'Diciembre 2023',
    description:
      'Generación de contenido dinámico y gestión de comunidades durante 3 meses, incrementando el engagement rate orgánico en un asombroso 125%.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    height: 600,
    url: 'https://ejemplo.com',
  },
  {
    id: '5',
    category: 'Contenido Audiovisual',
    title: 'Comercial TV Nacional',
    client: 'iShop',
    date: 'Noviembre 2023',
    description:
      'Producción, dirección y edición de una pieza audiovisual publicitaria de 45 segundos transmitida en televisión abierta y medios digitales.',
    img: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?auto=format&fit=crop&w=800&q=80',
    height: 800,
    url: 'https://ejemplo.com',
  },
  {
    id: '6',
    category: 'Branding',
    title: 'Packaging Premium',
    client: 'Café Orígenes',
    date: 'Julio 2023',
    description:
      'Diseño estructural y gráfico de empaques para una línea exclusiva de café de exportación, destacando las texturas y la elegancia minimalista.',
    img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80',
    height: 550,
    url: 'https://ejemplo.com',
  },
  {
    id: '7',
    category: 'Diseño Web',
    title: 'Portal Corporativo',
    client: 'Fintech Solutions',
    date: 'Mayo 2024',
    description:
      'Arquitectura de la información, diseño UX/UI y desarrollo en React para la nueva web corporativa de una startup líder en soluciones financieras.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    height: 750,
    url: 'https://ejemplo.com',
  },
];

const CATEGORY_INFO = {
  Todos: {
    title: 'Proyectos Destacados',
    desc: 'Casos de éxito donde la creatividad y la estrategia se unen para lograr resultados que desafían lo convencional.',
  },
  Branding: {
    title: 'Branding & Identidad',
    desc: 'Construimos marcas con alma. Diseñamos identidades visuales que conectan profundamente con tu audiencia.',
  },
  'Diseño Web': {
    title: 'Desarrollo & UX/UI',
    desc: 'Plataformas digitales rápidas, intuitivas y diseñadas meticulosamente para convertir visitantes en clientes.',
  },
  'Marketing Digital': {
    title: 'Marketing de Resultados',
    desc: 'Campañas estratégicas impulsadas por datos para maximizar tu retorno de inversión y escalar tu negocio.',
  },
  'Social Media': {
    title: 'Gestión de Comunidades',
    desc: 'No solo publicamos, creamos conversaciones. Estrategias de contenido que generan engagement real.',
  },
  'Contenido Audiovisual': {
    title: 'Producción Audiovisual',
    desc: 'Contamos tu historia a través del lente. Fotografía y video de alta calidad que capturan la esencia de tu marca.',
  },
};

const MoodPrintProjects = ({ selectedCategory }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === 'Todos'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(
          (project) => project.category === selectedCategory,
        );

  const info = CATEGORY_INFO[selectedCategory] || CATEGORY_INFO['Todos'];

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

  return (
    <section className='mood-projects'>
      <div className='mood-projects__container'>
        <div className='mood-projects__header'>
          <FadeContent
            key={info.title}
            duration={0.8}
            delay={0.1}
            direction='bottom'
          >
            <h2 className='mood-projects__title'>{info.title}</h2>
            <p className='mood-projects__description'>{info.desc}</p>
          </FadeContent>
        </div>

        <div className='mood-projects__grid'>
          {filteredProjects.length > 0 ? (
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
            <p
              style={{ textAlign: 'center', marginTop: '4rem', color: 'gray' }}
            >
              Aún no hay proyectos en esta categoría.
            </p>
          )}
        </div>
      </div>

      {/* COMPONENTE SEPARADO Y LIMPIO */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default MoodPrintProjects;
