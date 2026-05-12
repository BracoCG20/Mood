import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import "./Home.scss";

const Home = () => {
	return (
		<div className='home'>
			<div className='home__hero-frame'>
				<Navbar />
				<Hero />
			</div>
			<Services />
		</div>
	);
};

export default Home;
