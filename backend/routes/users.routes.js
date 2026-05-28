import { Router } from 'express';
import {
  getUsers,
  createUser,
  getRoles,
  updateUser,
} from '../controllers/users.controller.js'; // 🌟 Importamos updateUser

const router = Router();

// Rutas para Usuarios
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser); // 🌟 NUEVA RUTA PARA EDITAR

// Ruta para Roles
router.get('/roles', getRoles);

export default router;
