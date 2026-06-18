// src/App.jsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Páginas Públicas ---
import Home from "./pages/Home/Home";
import AdnMood from "./pages/AdnMood/AdnMood";
import MoodPrint from "./pages/MoodPrint/MoodPrint";
import MoodMind from "./pages/MoodMind/MoodMind";
import Contact from "./pages/Contact/Contact";
import Careers from "./pages/Careers/Careers";

const App = () => {
	const { t } = useTranslation();

	useEffect(() => {
		const originalTitle = document.title;

		const handleVisibilityChange = () => {
			if (document.hidden) {
				document.title = t("tab.hidden");
			} else {
				document.title = t("tab.visible") || originalTitle;
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [t]);

	return (
		<>
			<ScrollToTop />
			<Routes>
				{/* =========================================
            RUTAS PÚBLICAS (ACCESIBLES PARA TODOS)
            ========================================= */}
				<Route path='/' element={<Home />} />
				<Route path='/adn-mood' element={<AdnMood />} />
				<Route path='/mood-print' element={<MoodPrint />} />
				<Route path='/mood-mind' element={<MoodMind />} />
				<Route path='/contacto' element={<Contact />} />
				<Route path='/trabaja_con_nosotros' element={<Careers />} />
			</Routes>
			<ToastContainer
				position='top-right'
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
};

export default App;
