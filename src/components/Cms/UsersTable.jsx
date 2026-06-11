//src/components/Cms/UserTable.jsx
import { useState } from 'react';
import {
  Edit,
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Ban,
  UserStar,
  ShieldUser,
} from 'lucide-react';
import './UsersTable.scss';

const UsersTable = ({ users, onEdit, onToggleStatus, onAddUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className='settings-view'>
      {/* 🌟 Header de la tabla con el botón de agregar */}
      <div className='settings-header-bar'>
        <div>
          <h2 className='settings-title'>Gestión de Accesos</h2>
          <p className='settings-subtitle'>
            Administra los credenciales y roles del equipo GTH.
          </p>
        </div>
        <button
          className='btn-shadcn-primary'
          onClick={onAddUser}
        >
          <UserPlus size={16} />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* 🌟 Tabla de Usuarios */}
      <div className='cms-table-wrapper'>
        <table className='cms-table'>
          <thead>
            <tr>
              {/* Separamos Nombre y Correo */}
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>País</th>
              <th>Última Modificación</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  {/* Columna Nombre */}
                  <td>
                    <span className='font-medium'>
                      {user.first_name} {user.last_name}
                    </span>
                  </td>

                  {/* Columna Correo */}
                  <td>
                    <span className='user-email'>{user.email}</span>
                  </td>

                  {/* Columna Rol */}
                  <td>
                    <span
                      className={`badge badge--role ${user.role_name === 'SuperAdmin' ? 'superadmin' : 'gth'}`}
                    >
                      {user.role_name === 'SuperAdmin' ? (
                        <ShieldUser size={14} />
                      ) : (
                        <ShieldCheck size={14} />
                      )}
                      {user.role_name || 'Sin Rol'}
                    </span>
                  </td>

                  <td>{user.country || '---'}</td>

                  <td>
                    <div className='audit-info'>
                      <span>{formatDate(user.updated_at)}</span>
                      <span className='audit-creator'>
                        Por: {user.creator_name || 'Sistema'}
                      </span>
                    </div>
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <div className='table-actions'>
                      <button
                        className='btn-action btn--icon-only btn--edit'
                        onClick={() => onEdit(user)}
                        title='Editar usuario'
                      >
                        <Edit size={16} />
                      </button>

                      {/* Simulación de botón de desactivar cuenta */}
                      <button
                        className='btn-action btn--icon-only btn--deactivate'
                        onClick={() =>
                          onToggleStatus && onToggleStatus(user.id)
                        }
                        title='Desactivar acceso'
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan='6'
                  className='cms-table__empty'
                >
                  No hay usuarios registrados en el sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className='cms-pagination'>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
