import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import {
  submitApplication,
  getApplications,
} from '../controllers/applications.controller.js'; // 🌟 Importa getApplications

dotenv.config();

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mood_cvs',
    resource_type: 'auto',
  },
});

const upload = multer({ storage: storage });

// Rutas
router.post('/', upload.single('cv'), submitApplication);
router.get('/', getApplications); // 🌟 NUEVA RUTA GET

export default router;
