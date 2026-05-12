import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Brands from '../../components/Brands/Brands';
import Services from '../../components/Services/Services';
import GradualBlur from '../../components/GradualBlur/GradualBlur'; // NUEVA IMPORTACIÓN
import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__hero-frame'>
        <Navbar />
        <Hero />
      </div>

      <Brands />
      <Services />

      {/* EFECTO DE DESENFOQUE GLOBAL FIJO */}
      <GradualBlur
        target='page' // CLAVE: Esto lo fija a la ventana (viewport)
        position='bottom'
        height='8rem' // Puedes subirlo a "10rem" si quieres que abarque más pantalla
        strength={3}
        divCount={6}
        curve='ease-out'
        exponential
        opacity={1}
      />
    </div>
  );
};

export default Home;
