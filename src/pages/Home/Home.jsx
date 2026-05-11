import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import "./Home.scss";

const Home = () => {
	return (
		<div className='home'>
			<div className='home__hero-frame'>
				<Navbar />
				<Hero />
			</div>
		</div>
	);
};

export default Home;
