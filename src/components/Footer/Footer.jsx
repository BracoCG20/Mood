import { ArrowUp, ArrowRight } from "lucide-react";
import "./Footer.scss";

const Footer = () => {
	// Lógica para que el año se actualice automáticamente
	const currentYear = new Date().getFullYear();

	// Función para volver al inicio de forma suave
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className='footer'>
			<div className='footer__container'>
				<div className='footer__top'>
					{/* Columna Izquierda: Marca, Lema y CTA */}
					<div className='footer__brand-section'>
						<span className='footer__logo'>Mood.</span>
						<h2 className='footer__slogan'>
							Impulsando marcas con lógica cinética y creatividad pura.
						</h2>

						<div className='footer__jobs'>
							<a href='#trabajo' className='btn-jobs'>
								<span className='btn-jobs__text'>Únete al equipo</span>
								<span className='btn-jobs__icon'>
									<ArrowRight size={18} />
								</span>
							</a>
						</div>
					</div>

					{/* Columna Derecha: Links y Scroll Top */}
					<div className='footer__nav-section'>
						{/* Grupo 1: Navegación (Igual al Navbar) */}
						<div className='footer__nav-group'>
							<h4 className='footer__nav-title'>NAVEGAR</h4>
							<ul className='footer__nav-list'>
								<li>
									<a href='#servicios' className='footer__nav-link'>
										Servicios
									</a>
								</li>
								<li>
									<a href='#proyectos' className='footer__nav-link'>
										Proyectos
									</a>
								</li>
								<li>
									<a href='#agencia' className='footer__nav-link'>
										Agencia
									</a>
								</li>
							</ul>
						</div>

						{/* Grupo 2: Redes */}
						<div className='footer__nav-group'>
							<h4 className='footer__nav-title'>CONECTAR</h4>
							<ul className='footer__nav-list'>
								<li>
									<a href='#linkedin' className='footer__nav-link'>
										LinkedIn
									</a>
								</li>
								<li>
									<a href='#instagram' className='footer__nav-link'>
										Instagram
									</a>
								</li>
								<li>
									<a href='#behance' className='footer__nav-link'>
										Behance
									</a>
								</li>
							</ul>
						</div>

						{/* Botón Scroll to Top */}
						<button
							className='footer__scroll-top'
							onClick={scrollToTop}
							aria-label='Volver arriba'
						>
							<ArrowUp size={20} strokeWidth={1.5} />
						</button>
					</div>
				</div>

				{/* Línea inferior: Copyright dinámico */}
				<div className='footer__bottom'>
					<p>&copy; {currentYear} Mood. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
