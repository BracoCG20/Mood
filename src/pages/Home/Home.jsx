import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Brands from '../../components/Brands/Brands';
import Services from '../../components/Services/Services';
import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';
import GradualBlur from '../../components/GradualBlur/GradualBlur';
import './Home.scss';

const Home = () => {
  return (
    // CORRECCIÓN: Cambiamos <div> por <main> para crear el Landmark
    <main className='home'>
      <div className='home__hero-frame'>
        <Navbar />
        <Hero />
      </div>

      <Brands />
      <Services />

      <div className='home__footer-area'>
        <Testimonials />
        <Footer />
      </div>

      <div className='home__desktop-blur'>
        <GradualBlur
          target='page'
          position='bottom'
          height='8rem'
          strength={3}
          divCount={6}
          curve='ease-out'
          exponential
          opacity={1}
        />
      </div>
    </main>
  );
};

export default Home;
