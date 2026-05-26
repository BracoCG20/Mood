import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Briefcase, LogOut, Users } from 'lucide-react'; // 🌟 Importamos Users
import logoMood from '../../assets/Logo_Mood.svg';
import './CmsSidebar.scss';

// 🌟 Recibimos las props para controlar la pestaña activa
const CmsSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useContext(AuthContext);

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

        {/* 🌟 NUEVA PESTAÑA */}
        <button
          className={`cms-sidebar-nav__link ${activeTab === 'postulantes' ? 'active' : ''}`}
          onClick={() => setActiveTab('postulantes')}
        >
          <Users size={18} />
          Postulantes
        </button>
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
