import Ricetta from '../models/Ricetta.js';
import cloudinary from '../config/cloudinaryConfig.js'; // Assicurati di aver configurato Cloudinary correttamente

// Ottieni tutte le ricette
export const getRicette = async (req, res) => {
  try {
    const ricette = await Ricetta.find();
    res.status(200).json(ricette);
  } catch (error) {
    console.error('Errore nel recupero delle ricette:', error);
    res.status(500).json({ message: 'Errore nel recupero delle ricette' });
  }
};

// Ottieni una singola ricetta tramite ID
export const getRicettaById = async (req, res) => {
  try {
    const { id } = req.params;
    const ricetta = await Ricetta.findById(id);
    if (!ricetta) {
      return res.status(404).json({ message: 'Ricetta non trovata' });
    }
    res.status(200).json(ricetta);
  } catch (error) {
    console.error('Errore nel recupero della ricetta:', error);
    res.status(500).json({ message: 'Errore nel recupero della ricetta' });
  }
};

// Crea una nuova ricetta (solo admin)
export const createRicetta = async (req, res) => {
  try {
    const { titolo, ingredienti, preparazione, tempoPreparazione } = req.body;
    let immagineUrl = null;

    // Se c'è un'immagine, caricala su Cloudinary
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        immagineUrl = result.secure_url;
      } catch (error) {
        console.error('Errore nel caricamento dell\'immagine su Cloudinary:', error);
        return res.status(500).json({ message: 'Errore durante il caricamento dell\'immagine' });
      }
    }

    const nuovaRicetta = new Ricetta({
      titolo,
      ingredienti: ingredienti.split(',').map((ing) => ing.trim()), // Separa e rimuove eventuali spazi
      preparazione,
      tempoPreparazione,
      immagine: immagineUrl,
    });

    await nuovaRicetta.save();
    res.status(201).json({ message: 'Ricetta creata con successo', nuovaRicetta });
  } catch (error) {
    console.error('Errore durante la creazione della ricetta:', error);
    res.status(500).json({ message: 'Errore durante la creazione della ricetta' });
  }
};

// Aggiorna una ricetta esistente (solo admin)
export const updateRicetta = async (req, res) => {
  const { id } = req.params;
  const { titolo, ingredienti, preparazione, tempoPreparazione } = req.body;
  let immagineUrl = null;

  try {
    // Carica una nuova immagine se presente
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        immagineUrl = result.secure_url;
      } catch (error) {
        console.error('Errore nel caricamento dell\'immagine su Cloudinary:', error);
        return res.status(500).json({ message: 'Errore durante il caricamento dell\'immagine' });
      }
    }

    const updatedData = {
      titolo,
      ingredienti: ingredienti.split(',').map((ing) => ing.trim()), // Separa e rimuove eventuali spazi
      preparazione,
      tempoPreparazione,
      ...(immagineUrl && { immagine: immagineUrl }), // Aggiungi l'immagine solo se presente
    };

    const ricetta = await Ricetta.findByIdAndUpdate(id, updatedData, { new: true });

    if (!ricetta) {
      return res.status(404).json({ message: 'Ricetta non trovata' });
    }

    res.status(200).json({ message: 'Ricetta aggiornata con successo', ricetta });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della ricetta:', error);
    res.status(500).json({ message: 'Errore durante l\'aggiornamento della ricetta' });
  }
};

// Elimina una ricetta esistente (solo admin)
export const deleteRicetta = async (req, res) => {
  const { id } = req.params;

  try {
    const ricetta = await Ricetta.findByIdAndDelete(id);

    if (!ricetta) {
      return res.status(404).json({ message: 'Ricetta non trovata' });
    }

    res.status(200).json({ message: 'Ricetta eliminata con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione della ricetta:', error);
    res.status(500).json({ message: 'Errore durante l\'eliminazione della ricetta' });
  }
};
