// src/components/AdnContent/AdnContent.jsx
import { useTranslation } from "react-i18next";
import FadeContent from "../FadeContent/FadeContent";
import "./AdnContent.scss";

/**
 * Componente AdnContent.
 * Renderiza la declaración principal de la filosofía de la empresa (ADN).
 * Presenta un diseño asimétrico con una etiqueta destacada a la izquierda
 * y texto de alto impacto acompañado de hashtags a la derecha.
 */
const AdnContent = () => {
	const { t } = useTranslation();

	return (
		<section className='adn-content' id='adn-content'>
			<div className='adn-content__container'>
				{/* Columna Izquierda: Etiqueta indicadora */}
				<FadeContent duration={0.6} delay={0.2} className='adn-content__left'>
					<div className='adn-content__badge'>
						<span className='adn-content__badge-dot'></span>
						{t("adnContent.badge")}
					</div>
				</FadeContent>

				{/* Columna Derecha: Declaración principal y etiquetas */}
				<FadeContent duration={0.8} delay={0.4} className='adn-content__right'>
					<h2 className='adn-content__text'>
						{t("adnContent.textMain")}
						<span className='adn-content__text-light'>
							{t("adnContent.textLight")}
						</span>
					</h2>

					<div className='adn-content__hashtags'>
						<span>#Ecommerce</span>
						<span>#DigitalTransformation</span>
						<span>#BrandStrategy</span>
						<span>#Partnership</span>
						<span>#SocialStrategy</span>
						<span>{t("adnContent.tags.content")}</span>
						<span>{t("adnContent.tags.web")}</span>
					</div>
				</FadeContent>
			</div>
		</section>
	);
};

export default AdnContent;
