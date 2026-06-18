// src/components/BlurText/BlurText.jsx
import { motion, useInView } from "motion/react";
import { useRef, useMemo } from "react";
import "./BlurText.scss";

/**
 * Utilidad para construir los keyframes de la animación combinando
 * el estado inicial y los pasos de la animación.
 * @param {Object} from - Estado inicial de la animación.
 * @param {Array<Object>} steps - Arreglo con los pasos de la animación.
 * @returns {Object} Objeto de keyframes formateado para Framer Motion.
 */
const buildKeyframes = (from, steps) => {
	const keys = new Set([
		...Object.keys(from),
		...steps.flatMap((s) => Object.keys(s)),
	]);
	const keyframes = {};
	keys.forEach((k) => {
		keyframes[k] = [from[k], ...steps.map((s) => s[k])];
	});
	return keyframes;
};

/**
 * Componente BlurText.
 * Anima un texto dividiéndolo por letras o palabras, aplicando un efecto
 * de desenfoque (blur) y traslación cuando entra en el viewport.
 * * @param {Object} props
 * @param {string} props.text - Texto a animar.
 * @param {number} [props.delay=200] - Retraso (en ms) entre cada elemento animado.
 * @param {string} [props.className=""] - Clases CSS adicionales.
 * @param {('words'|'letters')} [props.animateBy="words"] - Define si la animación es por palabras o letras.
 * @param {('top'|'bottom')} [props.direction="top"] - Dirección desde donde entra el texto.
 * @param {number} [props.threshold=0.1] - Porcentaje de visibilidad requerido para disparar la animación.
 * @param {string} [props.rootMargin="0px"] - Margen del IntersectionObserver.
 * @param {Object} [props.animationFrom] - Sobrescribe el estado inicial de la animación.
 * @param {Array<Object>} [props.animationTo] - Sobrescribe los pasos de la animación.
 * @param {Function} [props.easing=(t)=>t] - Función de aceleración/desaceleración (ease).
 * @param {Function} [props.onAnimationComplete] - Callback ejecutado al terminar la animación completa.
 * @param {number} [props.stepDuration=0.35] - Duración (en segundos) de cada paso de la animación.
 * @param {string} [props.as="p"] - Etiqueta HTML a renderizar (por defecto 'p').
 * @param {Array<string>} [props.highlightWords=[]] - Palabras específicas a resaltar visualmente.
 */
const BlurText = ({
	text = "",
	delay = 200,
	className = "",
	animateBy = "words",
	direction = "top",
	threshold = 0.1,
	rootMargin = "0px",
	animationFrom,
	animationTo,
	easing = (t) => t,
	onAnimationComplete,
	stepDuration = 0.35,
	as: Tag = "p",
	highlightWords = [],
}) => {
	const elements = animateBy === "words" ? text.split(" ") : text.split("");
	const ref = useRef(null);

	const inView = useInView(ref, {
		once: true,
		amount: threshold,
		margin: rootMargin,
	});

	const defaultFrom = useMemo(
		() =>
			direction === "top"
				? { filter: "blur(10px)", opacity: 0, y: -50 }
				: { filter: "blur(10px)", opacity: 0, y: 50 },
		[direction],
	);

	const defaultTo = useMemo(
		() => [
			{
				filter: "blur(5px)",
				opacity: 0.5,
				y: direction === "top" ? 5 : -5,
			},
			{ filter: "blur(0px)", opacity: 1, y: 0 },
		],
		[direction],
	);

	const fromSnapshot = animationFrom ?? defaultFrom;
	const toSnapshots = animationTo ?? defaultTo;

	const stepCount = toSnapshots.length + 1;
	const totalDuration = stepDuration * (stepCount - 1);
	const times = Array.from({ length: stepCount }, (_, i) =>
		stepCount === 1 ? 0 : i / (stepCount - 1),
	);

	return (
		<Tag ref={ref} className={`blur-text ${className}`}>
			{elements.map((segment, index) => {
				const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

				const spanTransition = {
					duration: totalDuration,
					times,
					delay: (index * delay) / 1000,
					ease: easing,
				};

				const cleanWord = segment.replace(/[.,]/g, "").toLowerCase();
				const isHighlighted = highlightWords.some(
					(hw) => cleanWord === hw.toLowerCase(),
				);

				return (
					<motion.span
						className={`blur-text__segment ${isHighlighted ? "blur-text__segment--highlight" : ""}`}
						key={index}
						initial={fromSnapshot}
						animate={inView ? animateKeyframes : fromSnapshot}
						transition={spanTransition}
						onAnimationComplete={
							index === elements.length - 1 ? onAnimationComplete : undefined
						}
					>
						{segment === " " ? "\u00A0" : segment}
						{animateBy === "words" && index < elements.length - 1 && "\u00A0"}
					</motion.span>
				);
			})}
		</Tag>
	);
};

export default BlurText;
