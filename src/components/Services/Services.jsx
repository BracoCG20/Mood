import ScrollFloat from "../ScrollFloat/ScrollFloat";
import "./Services.scss";

const Services = () => {
	return (
		<section className='services' id='servicios'>
			<div className='services__container'>
				<ScrollFloat
					animationDuration={1}
					ease='back.inOut(2)'
					scrollStart='center bottom+=50%'
					scrollEnd='bottom center' // Ajustado para que termine de animarse cuando llegue al centro de la pantalla
					stagger={0.03}
				>
					Servicios
				</ScrollFloat>

				{/* Aquí integraremos el contenido de los servicios */}
			</div>
		</section>
	);
};

export default Services;
