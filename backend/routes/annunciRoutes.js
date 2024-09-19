import express from 'express';
import { createAnnuncio, getAllAnnouncements, updateAnnouncement, deleteAnnouncement } from '../controllers/annunciController.js';
import requireAuth from '../middlewares/authMiddlewares.js'; // Middleware di autenticazione
import upload from '../middlewares/uploadImage.js';
import Announcement from '../models/Annuncio.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';



const router = express.Router();

// Usa upload.single('media') per gestire l'upload di un singolo file
router.post('/annunci', requireAuth, upload.single('media'), createAnnuncio);

// Rotta per ottenere tutti gli annunci
router.get('/annunci', getAllAnnouncements);

// Rotta per aggiornare un annuncio esistente
router.put('/annunci/:id', requireAuth, adminMiddleware, upload.single('media'), updateAnnouncement);

// Rotta per eliminare un annuncio
router.delete('/annunci/:id', requireAuth, adminMiddleware, deleteAnnouncement);

//Routes per le immagini su cloud
router.post('/upload-foto-annunci',adminMiddleware, requireAuth, upload.single('media'), async(req, res) => {
    if (!req.file) {
        return res.status(400).json({message:'errore: nessun file caricato!'})
    }
    try {
        const annuncio = await Announcement.findById(req.annuncio._id);
        if (!annuncio) {
            return res.status (404).json({message:'utante non trovato!'})
        }
        annuncio.immagine = req.file.path;
        await annuncio.save();
        res.status(200).json({message: 'foto aggiornata', image:annuncio.immagine})
    } 
    catch (error){
        res.status(500).json({message:'problema', error});
    }
})

export default router;
