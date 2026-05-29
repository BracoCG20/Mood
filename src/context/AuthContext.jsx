import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// 🌟 INICIALIZACIÓN SÍNCRONA (Lazy Initializer)
	// React lee el localStorage ANTES del primer render para saber si hay sesión activa.
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		return localStorage.getItem("cms_token") !== null;
	});

	// Hacemos lo mismo con los datos del usuario
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("cms_user");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const navigate = useNavigate();

	// 🌟 Como leímos los datos directo en los useState, ya no necesitamos el useEffect inicial.

	const login = (token, userData) => {
		localStorage.setItem("cms_token", token);
		localStorage.setItem("cms_user", JSON.stringify(userData)); // Guardamos el usuario en local

		setIsAuthenticated(true);
		setUser(userData); // Guardamos el usuario en el estado

		navigate("/cms/dashboard");
	};

	const logout = () => {
		localStorage.removeItem("cms_token");
		localStorage.removeItem("cms_user"); // Limpiamos el usuario

		setIsAuthenticated(false);
		setUser(null); // Limpiamos el estado

		navigate("/cms/login");
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
