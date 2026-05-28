import { Router } from 'express';
import multer from 'multer';
import {
  getUsers,
  createUser,
  getRoles,
  updateUser,
  updateProfile,
} from '../controllers/users.controller.js';

const router = Router();

// 🌟 Configuramos multer para guardar la imagen en memoria temporalmente
const upload = multer({ storage: multer.memoryStorage() });

// Rutas para Usuarios
router.get('/', getUsers);
router.post('/', createUser);

// 🌟 NUEVA RUTA PARA EDITAR PERFIL PROPIO (Debe ir antes de /:id)
// Usamos upload.single('avatar') para interceptar la imagen
router.put('/profile/:id', upload.single('avatar'), updateProfile);

// Ruta para editar usuario desde el panel del administrador
router.put('/:id', updateUser);

// Ruta para Roles
router.get('/roles', getRoles);

export default router;
