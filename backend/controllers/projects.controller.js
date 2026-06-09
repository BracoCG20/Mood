//backend/controllers/projects.controller.js
/* global process */
import { pool } from '../config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// 🌟 CONFIGURACIÓN DE CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- OBTENER TODOS LOS PROYECTOS ---
export const getProjects = async (req, res) => {
  try {
    const query = `
      SELECT p.*, u.first_name as creator_name 
      FROM projects p
      LEFT JOIN users u ON p.created_by = u.id
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ message: 'Error interno al cargar los proyectos.' });
  }
};

// --- CREAR UN NUEVO PROYECTO ---
export const createProject = async (req, res) => {
  const {
    title,
    description,
    category,
    client,
    date,
    project_url,
    created_by,
  } = req.body;

  try {
    // 1. Validar que la imagen venga en la petición
    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'La imagen principal es obligatoria.' });
    }

    // 2. Subir imagen a Cloudinary desde el buffer de memoria
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: 'mood_projects',
      resource_type: 'auto',
    });

    const imgUrl = uploadResult.secure_url;

    // 3. Insertar en la Base de Datos
    const insertQuery = `
      INSERT INTO projects (title, description, category, client, date, img_url, project_url, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *
    `;

    const result = await pool.query(insertQuery, [
      title,
      description || null,
      category,
      client || null,
      date || null,
      imgUrl,
      project_url || null,
      created_by || null,
    ]);

    res
      .status(201)
      .json({ message: 'Proyecto creado con éxito.', project: result.rows[0] });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ message: 'Error interno al crear el proyecto.' });
  }
};

// --- CAMBIAR ESTADO DEL PROYECTO (Activar / Inactivar) ---
// Útil si quieres ocultar temporalmente un proyecto de la web pública
export const toggleProjectStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await pool.query(
      'SELECT is_active FROM projects WHERE id = $1',
      [id],
    );

    if (project.rows.length === 0) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    const newStatus = !project.rows[0].is_active;

    await pool.query('UPDATE projects SET is_active = $1 WHERE id = $2', [
      newStatus,
      id,
    ]);

    res.json({
      message: newStatus ? 'Proyecto activado' : 'Proyecto ocultado',
      is_active: newStatus,
    });
  } catch (error) {
    console.error('Error al actualizar estado del proyecto:', error);
    res
      .status(500)
      .json({ message: 'Error al cambiar el estado del proyecto' });
  }
};

// --- ACTUALIZAR UN PROYECTO EXISTENTE ---
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, client, date, project_url } = req.body;

  try {
    let query = `
      UPDATE projects 
      SET title = $1, description = $2, category = $3, client = $4, date = $5, project_url = $6
    `;
    let values = [
      title,
      description || null,
      category,
      client || null,
      date || null,
      project_url || null,
    ];
    let queryIndex = 7;

    // Si el usuario subió una NUEVA imagen al editar, la actualizamos en Cloudinary
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: 'mood_projects',
      });

      query += `, img_url = $${queryIndex}`;
      values.push(uploadResult.secure_url);
      queryIndex++;
    }

    query += ` WHERE id = $${queryIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    res.json({
      message: 'Proyecto actualizado con éxito',
      project: result.rows[0],
    });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ message: 'Error al actualizar el proyecto.' });
  }
};
