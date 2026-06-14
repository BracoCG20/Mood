// src/pages/AdnMood/AdnMood.jsx
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AdnHero from "../../components/AdnHero/AdnHero";
import AdnContent from "../../components/AdnContent/AdnContent";
import AdnWork from "../../components/AdnWork/AdnWork";
import AdnTeam from "../../components/AdnTeam/AdnTeam";
import "./AdnMood.scss";

/**
 * Componente de página AdnMood.
 * Representa la vista "ADN" (Nosotros / Filosofía de la empresa).
 * Orquesta la estructura de la página incluyendo el frame superior, el contenido y el pie de página.
 */
const AdnMood = () => {
	return (
		<main className='adn'>
			<div className='adn__hero-frame'>
				<Navbar />
				<AdnHero />
			</div>

			<AdnContent />
			<AdnWork />
			<AdnTeam />

			<div className='adn__footer-area'>
				<Footer />
			</div>
		</main>
	);
};

export default AdnMood;
