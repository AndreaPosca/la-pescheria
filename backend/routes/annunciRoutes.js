import express from 'express';
import { createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement } from '../controllers/annunciController.js';
// Middleware per garantire che solo l'amministratore acceda
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Rotte per gli annunci
router.post('/', adminMiddleware, createAnnouncement); // Crea un annuncio (solo admin)
router.get('/', getAllAnnouncements); // Visualizza tutti gli annunci
router.put('/:id', adminMiddleware, updateAnnouncement); // Aggiorna un annuncio (solo admin)
router.delete('/:id', adminMiddleware, deleteAnnouncement); // Elimina un annuncio (solo admin)

export default router;
