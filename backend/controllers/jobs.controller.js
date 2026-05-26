import { pool } from '../config/db.js';

// --- OBTENER TODOS LOS TRABAJOS (Para la web pública y el Dashboard) ---
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

// --- OBTENER UN TRABAJO POR ID (Con las preguntas incluidas) ---
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

// --- CREAR UN NUEVO TRABAJO (Con sus detalles y preguntas filtro) ---
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
    res.status(201).json({
      message: 'Vacante y preguntas publicadas con éxito',
      id: newJobId,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear trabajo completo con preguntas:', error);
    res
      .status(500)
      .json({ message: 'Error al guardar la vacante y sus componentes' });
  } finally {
    client.release();
  }
};

// 🌟 NUEVO: CAMBIAR ESTADO DE LA VACANTE (Activar / Dar de baja) ---
export const toggleJobStatus = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Obtener el estado actual
    const job = await pool.query('SELECT is_active FROM jobs WHERE id = $1', [
      id,
    ]);

    if (job.rows.length === 0) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }

    const currentStatus = job.rows[0].is_active;
    const newStatus = !currentStatus; // Invierte el estado

    // 2. Actualizar en la base de datos
    await pool.query('UPDATE jobs SET is_active = $1 WHERE id = $2', [
      newStatus,
      id,
    ]);

    res.json({
      message: newStatus ? 'Vacante activada' : 'Vacante dada de baja',
      is_active: newStatus,
    });
  } catch (error) {
    console.error('Error al actualizar estado de la vacante:', error);
    res.status(500).json({ message: 'Error al cambiar el estado' });
  }
};
