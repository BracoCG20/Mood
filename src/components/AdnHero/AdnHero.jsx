// src/components/AdnHero/AdnHero.jsx
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import BlurText from "../BlurText/BlurText";
import FadeContent from "../FadeContent/FadeContent";
import "./AdnHero.scss";

/**
 * Componente Hero de la vista de ADN.
 * Despliega el título principal de la filosofía de la empresa, una imagen dinámica
 * según el viewport (Desktop vs Mobile) y un botón de scroll fluido hacia el contenido.
 */
const AdnHero = () => {
	const { t } = useTranslation();

	const handleScroll = () => {
		const element = document.getElementById("adn-content");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section className='adn-hero'>
			<div className='adn-hero__container'>
				<div className='adn-hero__header'>
					<BlurText
						text={t("adnHero.title1")}
						delay={30}
						animateBy='words'
						direction='top'
						as='h1'
						className='adn-hero__title'
					/>
					<BlurText
						text={t("adnHero.title2")}
						delay={50}
						animateBy='words'
						direction='top'
						as='h1'
						className='adn-hero__title adn-hero__title-light'
					/>
				</div>

				<div className='adn-hero__middle'>
					<button
						className='adn-hero__scroll-btn'
						aria-label={t("adnHero.ariaScroll")}
						onClick={handleScroll}
					>
						<ChevronDown size={24} />
					</button>

					<div className='adn-hero__paragraph-wrapper'>
						<BlurText
							text={t("adnHero.paragraph")}
							delay={40}
							animateBy='words'
							direction='top'
							as='p'
							className='adn-hero__paragraph'
						/>
					</div>
				</div>
			</div>

			{/* Variante de Imagen: Desktop */}
			<div className='adn-hero__image-wrapper adn-hero__image-wrapper--desktop'>
				<FadeContent duration={1} delay={0.5}>
					<img
						src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&h=492&q=80'
						alt={t("adnHero.altDesktop")}
						className='adn-hero__image'
						crossOrigin='anonymous'
						referrerPolicy='no-referrer'
					/>
				</FadeContent>
			</div>

			{/* Variante de Imagen: Tablet / Mobile */}
			<div className='adn-hero__image-wrapper adn-hero__image-wrapper--mobile'>
				<FadeContent duration={1} delay={0.5}>
					<img
						src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
						alt={t("adnHero.altMobile")}
						className='adn-hero__image'
						crossOrigin='anonymous'
						referrerPolicy='no-referrer'
					/>
				</FadeContent>
			</div>
		</section>
	);
};

export default AdnHero;
