//backend/controllers/jobs.controller.js
import { pool } from '../config/db.js';

// --- OBTENER TODOS LOS TRABAJOS ---
export const getJobs = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jobs ORDER BY created_at DESC',
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener trabajos:', error);
    res
      .status(500)
      .json({ message: 'Error interno del servidor al obtener vacantes' });
  }
};

// --- OBTENER UN TRABAJO POR ID ---
export const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT j.*, d.description, d.responsibilities, d.requirements, d.benefits, d.questions 
       FROM jobs j 
       LEFT JOIN job_details d ON j.id = d.job_id 
       WHERE j.id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener detalles del trabajo:', error);
    res.status(500).json({ message: 'Error al obtener la vacante' });
  }
};

// --- CREAR UN NUEVO TRABAJO ---
export const createJob = async (req, res) => {
  const {
    title,
    category,
    type,
    country,
    date,
    description,
    responsibilities,
    requirements,
    benefits,
    questions,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const jobResult = await client.query(
      `INSERT INTO jobs (title, category, type, country, date) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [title, category, type, country, date],
    );

    const newJobId = jobResult.rows[0].id;

    await client.query(
      `INSERT INTO job_details (job_id, description, responsibilities, requirements, benefits, questions) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        newJobId,
        description,
        responsibilities,
        requirements,
        benefits,
        JSON.stringify(questions || []),
      ],
    );

    await client.query('COMMIT');
    res
      .status(201)
      .json({ message: 'Vacante publicada con éxito', id: newJobId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear trabajo completo con preguntas:', error);
    res.status(500).json({ message: 'Error al guardar la vacante' });
  } finally {
    client.release();
  }
};

// --- ACTUALIZAR UNA VACANTE EXISTENTE ---
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    category,
    type,
    country,
    date,
    description,
    responsibilities,
    requirements,
    benefits,
    questions,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 🌟 ACTUALIZACIÓN: Aquí forzamos que el created_at se vuelva a poner en la hora actual
    await client.query(
      `UPDATE jobs 
       SET title = $1, category = $2, type = $3, country = $4, date = $5, created_at = CURRENT_TIMESTAMP 
       WHERE id = $6`,
      [title, category, type, country, date, id],
    );

    await client.query(
      `UPDATE job_details 
       SET description = $1, responsibilities = $2, requirements = $3, benefits = $4, questions = $5 
       WHERE job_id = $6`,
      [
        description,
        responsibilities,
        requirements,
        benefits,
        JSON.stringify(questions || []),
        id,
      ],
    );

    await client.query('COMMIT');
    res.json({ message: 'Vacante actualizada con éxito' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al actualizar vacante:', error);
    res.status(500).json({ message: 'Error al actualizar la vacante' });
  } finally {
    client.release();
  }
};

// --- CAMBIAR ESTADO DE LA VACANTE (Activar / Dar de baja) ---
export const toggleJobStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await pool.query('SELECT is_active FROM jobs WHERE id = $1', [
      id,
    ]);

    if (job.rows.length === 0) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }

    const currentStatus = job.rows[0].is_active;
    const newStatus = !currentStatus;

    // 🌟 NUEVA LÓGICA: Si la estamos ACTIVANDO (true), actualizamos también la fecha
    if (newStatus === true) {
      // Calculamos el mes y año en español (Ej: "Junio 2026") para la web pública
      const currentDate = new Date();
      const month = currentDate.toLocaleString('es-ES', { month: 'long' });
      const year = currentDate.getFullYear();
      const formattedDate = `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;

      await pool.query(
        `UPDATE jobs 
         SET is_active = $1, created_at = CURRENT_TIMESTAMP, date = $2 
         WHERE id = $3`,
        [newStatus, formattedDate, id],
      );
    } else {
      // Si solo la estamos dando de baja (false), no tocamos la fecha
      await pool.query('UPDATE jobs SET is_active = $1 WHERE id = $2', [
        newStatus,
        id,
      ]);
    }

    res.json({
      message: newStatus ? 'Vacante activada' : 'Vacante dada de baja',
      is_active: newStatus,
    });
  } catch (error) {
    console.error('Error al actualizar estado de la vacante:', error);
    res.status(500).json({ message: 'Error al cambiar el estado' });
  }
};
