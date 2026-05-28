/* global process */
import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

// --- OBTENER TODOS LOS USUARIOS ---
export const getUsers = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id, u.email, u.first_name, u.last_name, u.country, u.created_at, u.updated_at,
        r.name as role_name,
        r.id as role_id,
        c.first_name as creator_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN users c ON u.created_by = c.id
      ORDER BY u.created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno al cargar los usuarios.' });
  }
};

// --- CREAR UN NUEVO USUARIO ---
export const createUser = async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    country,
    role_id,
    created_by,
  } = req.body;

  try {
    // 1. Verificar si el correo ya existe
    const userExists = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    );
    if (userExists.rows.length > 0) {
      return res
        .status(400)
        .json({ message: 'Este correo electrónico ya está registrado.' });
    }

    // 2. Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insertar el nuevo usuario (🌟 CORREGIDO: password_hash)
    const insertQuery = `
      INSERT INTO users (email, password_hash, first_name, last_name, country, role_id, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id, email, first_name, last_name
    `;

    const result = await pool.query(insertQuery, [
      email,
      hashedPassword,
      first_name,
      last_name,
      country,
      role_id,
      created_by || null,
    ]);

    res
      .status(201)
      .json({ message: 'Usuario creado con éxito.', user: result.rows[0] });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error interno al crear el usuario.' });
  }
};

// --- OBTENER TODOS LOS ROLES ---
export const getRoles = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name FROM roles ORDER BY id ASC',
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ message: 'Error interno al cargar los roles.' });
  }
};

// --- ACTUALIZAR UN USUARIO EXISTENTE ---
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, country, role_id, password, updated_by } =
    req.body;

  try {
    let updateQuery = `
      UPDATE users 
      SET first_name = $1, last_name = $2, country = $3, role_id = $4, updated_by = $5, updated_at = CURRENT_TIMESTAMP
    `;
    let values = [first_name, last_name, country, role_id, updated_by || null];

    // Si el usuario escribió una nueva contraseña, la actualizamos también
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      updateQuery += `, password_hash = $6 WHERE id = $7 RETURNING id`;
      values.push(hashedPassword, id);
    } else {
      // Si no envió contraseña, actualizamos solo los demás datos
      updateQuery += ` WHERE id = $6 RETURNING id`;
      values.push(id);
    }

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Usuario actualizado con éxito.' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res
      .status(500)
      .json({ message: 'Error interno al actualizar el usuario.' });
  }
};
