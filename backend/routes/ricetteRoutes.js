import express from 'express';
import { getRicette, getRicettaById, createRicetta, updateRicetta, deleteRicetta } from '../controllers/ricetteController.js';
import requireAuth from '../middlewares/authMiddlewares.js'; // Importa il middleware per l'autenticazione
import adminMiddleware from '../middlewares/adminMiddleware.js'; // Importa il middleware per l'accesso admin
import upload from '../middlewares/uploadImage.js';

const router = express.Router();

// Rotta per ottenere tutte le ricette
router.get('/ricette', getRicette);

// Rotta per ottenere una singola ricetta tramite ID
router.get('/ricette/:id', getRicettaById);

// Rotta per creare una nuova ricetta (solo admin)
router.post(
  '/ricette',
  requireAuth,
  adminMiddleware,
  upload.single('immagine'),
  createRicetta
);

// Rotta per aggiornare una ricetta esistente (solo admin)
router.put(
  '/ricette/:id',
  requireAuth,
  adminMiddleware,
  upload.single('immagine'),
  updateRicetta
);

// Rotta per eliminare una ricetta (solo admin)
router.delete(
  '/ricette/:id',
  requireAuth,
  adminMiddleware,
  deleteRicetta
);

export default router;
