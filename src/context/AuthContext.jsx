import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 🌟 Nuevo estado para guardar la información del usuario
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Al cargar la app, revisamos si ya hay un token y un usuario guardado
  useEffect(() => {
    const token = localStorage.getItem('cms_token');
    const savedUser = localStorage.getItem('cms_user');

    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser)); // Restauramos los datos del usuario
    }
  }, []);

  // 🌟 Ahora recibimos token y userData desde el login
  const login = (token, userData) => {
    localStorage.setItem('cms_token', token);
    localStorage.setItem('cms_user', JSON.stringify(userData)); // Guardamos el usuario en local

    setIsAuthenticated(true);
    setUser(userData); // Guardamos el usuario en el estado

    navigate('/cms/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user'); // Limpiamos el usuario

    setIsAuthenticated(false);
    setUser(null); // Limpiamos el estado

    navigate('/cms/login');
  };

  return (
    // 🌟 Exponemos 'user' para que otros componentes lo lean
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
