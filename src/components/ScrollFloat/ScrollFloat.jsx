import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ScrollFloat.scss";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
	children,
	animationDuration = 1,
	ease = "back.inOut(2)",
	scrollStart = "center bottom+=50%",
	scrollEnd = "bottom bottom-=40%",
	stagger = 0.03,
	className = "",
}) => {
	const containerRef = useRef(null);
	const text = String(children);

	// Separamos el texto en caracteres (letras)
	const chars = useMemo(() => {
		return text.split("").map((char, index) => (
			<span key={index} className='char'>
				{char === " " ? "\u00A0" : char}
			</span>
		));
	}, [text]);

	useEffect(() => {
		if (!containerRef.current) return;

		const charElements = containerRef.current.querySelectorAll(".char");

		// Animación de GSAP sincronizada con el Scroll
		const animation = gsap.fromTo(
			charElements,
			{
				opacity: 0,
				y: "100%",
			},
			{
				opacity: 1,
				y: "0%",
				duration: animationDuration,
				ease: ease,
				stagger: stagger,
				scrollTrigger: {
					trigger: containerRef.current,
					start: scrollStart,
					end: scrollEnd,
					scrub: true, // Esto hace que la animación vaya al ritmo de la rueda del mouse
				},
			},
		);

		return () => {
			animation.kill(); // Limpiamos la animación si el componente se desmonta
		};
	}, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

	return (
		<h2 ref={containerRef} className={`scroll-float-text ${className}`}>
			{chars}
		</h2>
	);
};

export default ScrollFloat;
