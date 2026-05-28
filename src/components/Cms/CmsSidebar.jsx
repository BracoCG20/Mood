import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Briefcase, LogOut, Users, Settings } from 'lucide-react';
import logoMood from '../../assets/Logo_Mood.svg';
import './CmsSidebar.scss';

const CmsSidebar = ({ activeTab, setActiveTab }) => {
  // 🌟 Extraemos también el 'user' (o como lo hayas nombrado en tu contexto)
  const { logout, user } = useContext(AuthContext);

  // 🌟 Verificamos si es SuperAdmin.
  // Dependiendo de cómo guardes el usuario al hacer login, verifica si es role_id o role_name
  const isSuperAdmin = user?.role_name === 'SuperAdmin' || user?.role_id === 1;

  return (
    <aside className='cms-sidebar-nav'>
      <div className='cms-sidebar-nav__brand'>
        <img
          src={logoMood}
          alt='Mood Agencia Logo'
          className='cms-sidebar-nav__logo'
        />
      </div>

      <nav className='cms-sidebar-nav__menu'>
        <button
          className={`cms-sidebar-nav__link ${activeTab === 'vacantes' ? 'active' : ''}`}
          onClick={() => setActiveTab('vacantes')}
        >
          <Briefcase size={18} />
          Vacantes
        </button>

        <button
          className={`cms-sidebar-nav__link ${activeTab === 'postulantes' ? 'active' : ''}`}
          onClick={() => setActiveTab('postulantes')}
        >
          <Users size={18} />
          Postulantes
        </button>

        {/* 🌟 RENDERIZADO CONDICIONAL: Solo aparece si isSuperAdmin es true */}
        {isSuperAdmin && (
          <button
            className={`cms-sidebar-nav__link ${activeTab === 'configuracion' ? 'active' : ''}`}
            onClick={() => setActiveTab('configuracion')}
          >
            <Settings size={18} />
            Configuración
          </button>
        )}
      </nav>

      <div className='cms-sidebar-nav__footer'>
        <button
          onClick={logout}
          className='cms-sidebar-nav__logout'
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default CmsSidebar;
