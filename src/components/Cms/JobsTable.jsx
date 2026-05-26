import { Power, PowerOff } from 'lucide-react'; // Íconos
import './JobsTable.scss';

const JobsTable = ({ jobs, onToggleStatus }) => {
  const formatExactDate = (dateString) => {
    if (!dateString) return '---';
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className='cms-table-wrapper'>
      <table className='cms-table'>
        <thead>
          <tr>
            <th>Puesto</th>
            <th>Modalidad</th>
            <th>País</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th> {/* 🌟 Nueva Columna */}
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr
                key={job.id}
                className={
                  !job.is_active ? 'row--inactive' : ''
                } /* 🌟 Clase condicional */
              >
                <td className='font-medium'>{job.title}</td>
                <td>{job.type}</td>
                <td>{job.country}</td>
                <td>{formatExactDate(job.created_at)}</td>
                <td>
                  <span
                    className={`badge ${job.is_active ? 'badge--active' : 'badge--inactive'}`}
                  >
                    {job.is_active ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td>
                  {/* 🌟 Botón de acción */}
                  <button
                    className={`btn-toggle-status ${job.is_active ? 'btn--deactivate' : 'btn--activate'}`}
                    onClick={() => onToggleStatus(job.id)}
                    title={
                      job.is_active ? 'Dar de baja vacante' : 'Activar vacante'
                    }
                  >
                    {job.is_active ? (
                      <PowerOff size={16} />
                    ) : (
                      <Power size={16} />
                    )}
                    <span>{job.is_active ? 'Dar de baja' : 'Activar'}</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan='6'
                className='cms-table__empty'
              >
                No hay vacantes publicadas en este momento.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
