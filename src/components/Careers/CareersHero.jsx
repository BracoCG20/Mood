// src/components/Careers/CareersHero.jsx
import { useTranslation } from "react-i18next";
import { Rocket, Brain, Coffee } from "lucide-react";
import BlurText from "../BlurText/BlurText";
import cultureData from "../../data/careersCulture.json";
import "./CareersHero.scss";

const iconMap = {
	Brain,
	Rocket,
	Coffee,
};

/**
 * Componente CareersHero.
 * Renderiza el banner principal de la bolsa de trabajo.
 * En escritorio, las tarjetas de cultura se apilan asimétricamente en una columna.
 * En tablet y móvil, se transforman automáticamente en un carrusel de loop infinito.
 */
const CareersHero = () => {
	const { t } = useTranslation();

	return (
		<section className='careers-hero'>
			<div className='careers-hero__background'>
				<div className='careers-hero__container'>
					{/* Columna Izquierda: Mensaje y Propuesta de Valor */}
					<div className='careers-hero__left-col'>
						<div className='careers-hero__title-group'>
							<BlurText
								text={t("careers.hero.title1")}
								delay={30}
								animateBy='words'
								direction='top'
								as='h1'
								className='careers-hero__title'
							/>
							<BlurText
								text={t("careers.hero.title2")}
								delay={45}
								animateBy='words'
								direction='top'
								as='span'
								className='careers-hero__highlight'
							/>
						</div>

						<div className='careers-hero__fade-in careers-hero__fade-in--delay-1'>
							<p className='careers-hero__subtitle'>
								{t("careers.hero.subtitle")}
							</p>
						</div>
					</div>

					{/* Columna Derecha: Tarjetas de Cultura Corporativa */}
					<div className='careers-hero__right-col careers-hero__fade-in careers-hero__fade-in--delay-2'>
						<h2 className='careers-hero__culture-title'>
							{t("careers.culture.title")}
						</h2>

						{/* Contenedor del Slide Infinito (La máscara visual) */}
						<div className='careers-hero__culture-grid'>
							{/* Pista de animación que se desliza en móvil */}
							<div className='careers-hero__culture-track'>
								{/* 1. GRUPO ORIGINAL (Visible en Desktop y Mobile) */}
								<div className='careers-hero__culture-group'>
									{cultureData.map((item) => {
										const IconComponent = iconMap[item.iconName];
										return (
											<div key={item.id} className='culture-card'>
												{IconComponent && (
													<IconComponent className='culture-card__icon' />
												)}
												<div className='culture-card__info'>
													<h3>{t(`careers.culture.items.${item.id}.title`)}</h3>
													<p>{t(`careers.culture.items.${item.id}.desc`)}</p>
												</div>
											</div>
										);
									})}
								</div>

								{/* 2. GRUPO DUPLICADO (Oculto en Desktop, Visible en Mobile para el Loop) */}
								<div className='careers-hero__culture-group careers-hero__culture-group--duplicate'>
									{cultureData.map((item) => {
										const IconComponent = iconMap[item.iconName];
										return (
											<div key={`dup-${item.id}`} className='culture-card'>
												{IconComponent && (
													<IconComponent className='culture-card__icon' />
												)}
												<div className='culture-card__info'>
													<h3>{t(`careers.culture.items.${item.id}.title`)}</h3>
													<p>{t(`careers.culture.items.${item.id}.desc`)}</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CareersHero;
