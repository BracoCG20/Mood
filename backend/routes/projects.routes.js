import { Router } from 'express';
import multer from 'multer';
import {
  getProjects,
  createProject,
  toggleProjectStatus,
  updateProject, // 🌟 NUEVA IMPORTACIÓN
} from '../controllers/projects.controller.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getProjects);
router.post('/', upload.single('img_url'), createProject);
router.patch('/:id/status', toggleProjectStatus);

// 🌟 NUEVA RUTA PARA EDITAR (Usamos upload.single para interceptar si suben nueva imagen)
router.put('/:id', upload.single('img_url'), updateProject);

export default router;
