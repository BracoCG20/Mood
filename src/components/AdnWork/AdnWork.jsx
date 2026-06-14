// src/components/AdnWork/AdnWork.jsx
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FadeContent from "../FadeContent/FadeContent";
import "./AdnWork.scss";

/**
 * Componente AdnWork.
 * Sección que detalla el enfoque de trabajo de la agencia.
 * Layout de dos columnas: imagen representativa a la izquierda y textos descriptivos
 * junto con un Call to Action (CTA) a la derecha.
 */
const AdnWork = () => {
	const { t } = useTranslation();

	return (
		<section className='adn-work'>
			<div className='adn-work__container'>
				{/* Columna Izquierda: Imagen */}
				<FadeContent duration={0.8} delay={0.2} className='adn-work__image-col'>
					<img
						src='https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
						alt={t("adnWork.altImage")}
						className='adn-work__image'
						crossOrigin='anonymous'
						referrerPolicy='no-referrer'
					/>
				</FadeContent>

				{/* Columna Derecha: Texto y Botón */}
				<div className='adn-work__content-col'>
					<div className='adn-work__texts'>
						<FadeContent duration={0.8} delay={0.4}>
							<p>{t("adnWork.p1")}</p>
						</FadeContent>

						<FadeContent duration={0.8} delay={0.5}>
							<p>{t("adnWork.p2")}</p>
						</FadeContent>
					</div>

					<FadeContent duration={0.8} delay={0.6}>
						<div className='adn-work__actions'>
							<Link to='/trabaja_con_nosotros' className='btn-jobs'>
								<span className='btn-jobs__text'>{t("adnWork.btn")}</span>
								<span className='btn-jobs__icon'>
									<ChevronRight size={18} />
								</span>
							</Link>
						</div>
					</FadeContent>
				</div>
			</div>
		</section>
	);
};

export default AdnWork;
