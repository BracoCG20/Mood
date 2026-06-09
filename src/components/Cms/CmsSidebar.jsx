//src/components/Cms/CmsSidebar.jsx
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  Briefcase,
  Users,
  FolderGit2,
  IdCard,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Menu,
  CircleUser,
  UserCircle,
} from 'lucide-react';
import logoMood from '../../assets/Logo_Mood.svg';
import './CmsSidebar.scss';

const CmsSidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const isSuperAdmin = user?.role_name === 'SuperAdmin' || user?.role_id === 1;
  const currentYear = new Date().getFullYear();

  // Cerrar menú de usuario si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar redimensionamiento de pantalla
  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (window.innerWidth <= 768) setIsOpen(false); // Cierra en móviles al seleccionar
  };

  const menuItems = [
    { id: 'inicio', name: 'Inicio', icon: <LayoutDashboard size={20} /> },
    { id: 'vacantes', name: 'Vacantes', icon: <Briefcase size={20} /> },
    { id: 'postulantes', name: 'Postulantes', icon: <Users size={20} /> },
    { id: 'proyectos', name: 'Proyectos', icon: <FolderGit2 size={20} /> },
    { id: 'equipo', name: 'Equipo Mood', icon: <IdCard size={20} /> },
  ];

  if (isSuperAdmin) {
    menuItems.push({
      id: 'configuracion',
      name: 'Configuración',
      icon: <Settings size={20} />,
    });
  }

  // Helper para mostrar avatar si existe
  const getAvatarUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };
  const avatarUrl = getAvatarUrl(user?.avatar_url);

  return (
    <>
      {/* 🌟 BOTÓN HAMBURGUESA PARA MÓVILES */}
      <button
        className={`cms-mobile-hamburger ${isOpen ? 'hidden' : ''}`}
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>

      {/* 🌟 OVERLAY OSCURO PARA MÓVILES */}
      {isOpen && (
        <div
          className='cms-mobile-overlay'
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`cms-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        {/* BOTÓN COLAPSAR (Escritorio) */}
        <button
          className='toggle-btn'
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        <div className='logo-container'>
          <img
            src={logoMood}
            alt='Mood Logo'
          />
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              title={!isOpen ? item.name : ''}
            >
              <div className='icon-wrapper'>{item.icon}</div>
              <span className='label'>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className='footer-actions'>
          <div
            className='user-menu-container'
            ref={menuRef}
          >
            {/* MINI TARJETA DE USUARIO */}
            <div
              className={`user-mini-card ${showUserMenu ? 'active' : ''}`}
              onClick={() => setShowUserMenu(!showUserMenu)}
              title={!isOpen ? 'Opciones de Usuario' : ''}
            >
              <div className='avatar'>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt='Avatar'
                  />
                ) : (
                  <CircleUser size={20} />
                )}
              </div>
              <div className='info'>
                <span className='name'>{user?.first_name || 'Admin'}</span>
                <span
                  className='email'
                  title={user?.email}
                >
                  {user?.email || 'Usuario de Mood'}
                </span>
              </div>
            </div>

            {/* MENÚ DESPLEGABLE (POPOVER) */}
            {showUserMenu && (
              <div className='user-dropdown'>
                <button
                  className='dropdown-item'
                  onClick={() => {
                    handleTabClick('perfil');
                    setShowUserMenu(false);
                  }}
                >
                  <UserCircle size={16} /> Mi Perfil
                </button>
                <div className='dropdown-divider'></div>
                <button
                  className='dropdown-item logout'
                  onClick={() => {
                    logout();
                    // El contexto o App.js debería encargarse de redirigir al login
                  }}
                >
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
          <p className='copyright'>© {currentYear} Mood</p>
        </div>
      </aside>
    </>
  );
};

export default CmsSidebar;
