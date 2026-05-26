import { Router } from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  toggleJobStatus, // <--- NUEVA IMPORTACIÓN
  updateJob, // <--- NUEVA IMPORTACIÓN
} from '../controllers/jobs.controller.js';

const router = Router();

// GET: /api/jobs -> Devuelve todas las vacantes para la tabla principal
router.get('/', getJobs);

// GET: /api/jobs/:id -> Devuelve una vacante específica con todos sus detalles (JobDetail)
router.get('/:id', getJobById);

// POST: /api/jobs -> Crea una nueva vacante completa con detalles (CMS)
router.post('/', createJob);

// PATCH: /api/jobs/:id/status -> Cambia el estado (Activa / Inactiva) de una vacante
router.patch('/:id/status', toggleJobStatus); // <--- NUEVA RUTA

// PUT: /api/jobs/:id -> Actualiza una vacante existente (CMS)
router.put('/:id', updateJob);

export default router;
