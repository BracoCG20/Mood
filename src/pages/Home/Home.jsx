import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Brands from "../../components/Brands/Brands";
import Services from "../../components/Services/Services";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import GradualBlur from "../../components/GradualBlur/GradualBlur";
import "./Home.scss";

const Home = () => {
	return (
		<div className='home'>
			<div className='home__hero-frame'>
				<Navbar />
				<Hero />
			</div>

			<Brands />
			<Services />

			{/* MAGIA: Envolvemos ambos componentes en un solo padre oscuro */}
			<div className='home__footer-area'>
				<Testimonials />
				<Footer />
			</div>

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
	);
};

export default Home;
