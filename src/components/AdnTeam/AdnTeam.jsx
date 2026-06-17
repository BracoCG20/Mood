// src/components/AdnTeam/AdnTeam.jsx
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Linkedin from "../Icons/Linkedin";
import FadeContent from "../FadeContent/FadeContent";
import "./AdnTeam.scss";
import teamData from "../../data/team.json";

/**
 * Sub-componente para líderes del equipo.
 * Utiliza matemáticas y SVG paths para generar un recorte (notch) responsivo en la esquina inferior derecha.
 */
const LeaderCardClipped = ({ member }) => {
	const cardRef = useRef(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		const element = cardRef.current;
		if (!element) return;

		const updateSize = () => {
			const rect = element.getBoundingClientRect();
			setSize({ width: rect.width, height: rect.height });
		};

		updateSize();
		const observer = new ResizeObserver(updateSize);
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	/**
	 * Genera el clipPath dinámico basado en las dimensiones actuales del contenedor.
	 * @param {number} w - Ancho
	 * @param {number} h - Alto
	 */
	const getDynamicPath = (w, h) => {
		if (w === 0 || h === 0) return "";

		const r = 16; // Radio principal
		const nw = 58; // Ancho del recorte
		const nh = 58; // Alto del recorte
		const nr = 16; // Radio interno de las curvas

		return `
      M ${r} 0
      L ${w - r} 0
      A ${r} ${r} 0 0 1 ${w} ${r}
      L ${w} ${h - nh - nr}
      A ${nr} ${nr} 0 0 1 ${w - nr} ${h - nh}
      L ${w - nw + nr} ${h - nh}
      A ${nr} ${nr} 0 0 0 ${w - nw} ${h - nh + nr}
      L ${w - nw} ${h - r}
      A ${r} ${r} 0 0 1 ${w - nw - r} ${h}
      L ${r} ${h}
      A ${r} ${r} 0 0 1 0 ${h - r}
      L 0 ${r}
      A ${r} ${r} 0 0 1 ${r} 0
      Z
    `
			.replace(/\s+/g, " ")
			.trim();
	};

	const dynamicClipPath = getDynamicPath(size.width, size.height);

	return (
		<div
			className='team-card'
			ref={cardRef}
			style={{
				position: "relative",
				filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.03))",
			}}
		>
			<div
				className='team-card__clipped-bg'
				style={{
					clipPath: dynamicClipPath ? `path('${dynamicClipPath}')` : "none",
					backgroundColor: "#fff",
					borderRadius: "20px",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					padding: "0.75rem",
				}}
			>
				<div className='team-card__image-wrapper'>
					<img
						src={member.image_url}
						alt={member.name}
						className='team-card__image'
						crossOrigin='anonymous'
						referrerPolicy='no-referrer'
					/>
					<a
						href={member.linkedin || "#"}
						className='team-card__linkedin'
						aria-label={`LinkedIn de ${member.name}`}
						target='_blank'
						rel='noreferrer'
					>
						<Linkedin size={18} />
					</a>
				</div>
				<div className='team-card__info-wrapper'>
					<div className='team-card__info'>
						<h3 className='team-card__name'>{member.name}</h3>
						<p className='team-card__role'>{member.role_key}</p>
					</div>
				</div>
			</div>

			<button
				className='team-card__action-btn'
				aria-label='Ver perfil completo'
			>
				<ChevronRight size={20} strokeWidth={2.5} />
			</button>
		</div>
	);
};

/**
 * Sub-componente para los miembros generales del equipo.
 * Variación de la tarjeta con recorte, optimizada para el carrusel inferior.
 */
const MemberCardClipped = ({ member }) => {
	const cardRef = useRef(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		const element = cardRef.current;
		if (!element) return;

		const updateSize = () => {
			const rect = element.getBoundingClientRect();
			setSize({ width: rect.width, height: rect.height });
		};

		updateSize();
		const observer = new ResizeObserver(updateSize);
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	const getDynamicPath = (w, h) => {
		if (w === 0 || h === 0) return "";
		const r = 16,
			nw = 58,
			nh = 58,
			nr = 16;
		return `
      M ${r} 0 L ${w - r} 0 A ${r} ${r} 0 0 1 ${w} ${r}
      L ${w} ${h - nh - nr} A ${nr} ${nr} 0 0 1 ${w - nr} ${h - nh}
      L ${w - nw + nr} ${h - nh} A ${nr} ${nr} 0 0 0 ${w - nw} ${h - nh + nr}
      L ${w - nw} ${h - r} A ${r} ${r} 0 0 1 ${w - nw - r} ${h}
      L ${r} ${h} A ${r} ${r} 0 0 1 0 ${h - r} L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z
    `
			.replace(/\s+/g, " ")
			.trim();
	};

	const dynamicClipPath = getDynamicPath(size.width, size.height);

	return (
		<div className='member-card' ref={cardRef}>
			<div
				className='member-card__clipped-bg'
				style={{
					clipPath: dynamicClipPath ? `path('${dynamicClipPath}')` : "none",
				}}
			>
				<div className='member-card__info'>
					<h4 className='member-card__name'>{member.name}</h4>
					<p className='member-card__role'>{member.role_key}</p>
				</div>
				<div className='member-card__footer'>
					<a
						href={member.linkedin || "#"}
						className='member-card__link'
						target='_blank'
						rel='noreferrer'
					>
						LINKEDIN
					</a>
				</div>
			</div>

			<a
				href={member.linkedin || "#"}
				className='member-card__btn'
				aria-label={`LinkedIn de ${member.name}`}
				target='_blank'
				rel='noreferrer'
			>
				<ChevronRight size={18} strokeWidth={2.5} />
			</a>
		</div>
	);
};

/**
 * Componente Principal de Equipo (AdnTeam).
 * Orquesta la carga de datos locales JSON y renderiza las secciones de líderes y equipo general (carrusel).
 */
const AdnTeam = () => {
	const { t } = useTranslation();
	const sliderRef = useRef(null);
	const [scrollProgress, setScrollProgress] = useState(0);

	const [teamMembers, setTeamMembers] = useState([]);
	const [generalTeam, setGeneralTeam] = useState([]);

	useEffect(() => {
		try {
			// Usamos la variable importada directamente desde el JSON
			const data = teamData;

			// Filtramos miembros activos y separamos por lógica de renderizado
			const activeMembers = data.filter((member) => member.is_active);

			setTeamMembers(
				activeMembers.filter((m) => m.image_url !== null && m.image_url !== ""),
			);
			setGeneralTeam(
				activeMembers.filter((m) => m.image_url === null || m.image_url === ""),
			);
		} catch (error) {
			console.error("Error al cargar equipo desde el JSON:", error);
		}
	}, []);

	const handleScroll = () => {
		if (!sliderRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
		const maxScroll = scrollWidth - clientWidth;
		const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
		setScrollProgress(progress);
	};

	const scroll = (direction) => {
		if (!sliderRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth, children } =
			sliderRef.current;
		const cardWidth = children[0] ? children[0].offsetWidth + 24 : 300;
		const maxScroll = scrollWidth - clientWidth;

		if (direction === "right") {
			if (scrollLeft >= maxScroll - 10) {
				sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
			} else {
				sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
			}
		} else {
			if (scrollLeft <= 10) {
				sliderRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
			} else {
				sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
			}
		}
	};

	return (
		<section className='adn-team'>
			<div className='adn-team__content-wrapper'>
				<div className='adn-team__container'>
					<FadeContent duration={0.8} delay={0.1}>
						<div className='adn-team__main-title'>
							<h2>
								{t("adnTeam.title1")} <span>{t("adnTeam.title2")}</span>
							</h2>
						</div>
					</FadeContent>

					<div className='adn-team__layout'>
						<div className='adn-team__info-column'>
							<FadeContent duration={0.8} delay={0.2}>
								<div className='adn-team__badge-wrapper'>
									<div className='adn-team__badge'>
										<span className='adn-team__badge-dot'></span>
										{t("adnTeam.badgeLeadership")}
									</div>
								</div>
								<p className='adn-team__description'>
									{t("adnTeam.descLeadership")}
								</p>
							</FadeContent>
						</div>

						<div className='adn-team__grid'>
							{teamMembers.map((member, index) => (
								<FadeContent
									key={member.id || index}
									duration={0.6}
									delay={0.3 + index * 0.1}
								>
									<LeaderCardClipped member={member} />
								</FadeContent>
							))}
						</div>
					</div>

					<div className='team-slider'>
						<FadeContent duration={0.8} delay={0.2}>
							<div className='team-slider__header'>
								<div className='team-slider__badge-wrapper'>
									<div className='adn-team__badge'>
										<span className='adn-team__badge-dot'></span>
										{t("adnTeam.badgeTeam")}
									</div>
								</div>
								<h3 className='team-slider__title'>{t("adnTeam.descTeam")}</h3>
							</div>
						</FadeContent>

						<FadeContent duration={0.8} delay={0.4}>
							<div
								className='team-slider__track'
								ref={sliderRef}
								onScroll={handleScroll}
							>
								{generalTeam.map((member, index) => (
									<MemberCardClipped key={member.id || index} member={member} />
								))}
							</div>

							<div className='team-slider__controls'>
								<div className='team-slider__progress'>
									<div
										className='team-slider__progress-bar'
										style={{ width: `${scrollProgress * 100}%` }}
									></div>
								</div>
								<div className='team-slider__arrows'>
									<button onClick={() => scroll("left")} aria-label='Anterior'>
										<ChevronLeft size={22} strokeWidth={2} />
									</button>
									<button
										onClick={() => scroll("right")}
										aria-label='Siguiente'
									>
										<ChevronRight size={22} strokeWidth={2} />
									</button>
								</div>
							</div>
						</FadeContent>
					</div>
				</div>
			</div>

			<div className='adn-team__footer-overlap'></div>
		</section>
	);
};

export default AdnTeam;
