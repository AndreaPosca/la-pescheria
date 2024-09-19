import cloudinary from '../config/cloudinaryConfig.js';
import Announcement from '../models/Annuncio.js';


// Crea un nuovo annuncio con immagine
export const createAnnuncio = async (req, res) => {
  try {
    const { titolo, contenuto } = req.body;
    console.log('Titolo:', titolo);
    console.log('Contenuto:', contenuto);
    let immagineUrl = null;

    // Carica l'immagine su Cloudinary
    if (req.file) {
      console.log("Caricamento immagine in Cloudinary in corso...");

      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Risultato Cloudinary:", result);

      immagineUrl = result.secure_url; // URL sicuro dell'immagine su Cloudinary
    }

    // Crea il nuovo annuncio
    const newAnnuncio = new Announcement({
      titolo,
      contenuto,
      immagine: immagineUrl, // Salva l'URL dell'immagine
    });

    await newAnnuncio.save();
    res.status(201).json(newAnnuncio);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
    
  }
};

// Ottieni tutti gli annunci
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aggiorna un annuncio esistente
export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { titolo, contenuto } = req.body;
  let immagineUrl = null;
  console.log(req.body);
  
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      immagineUrl = result.secure_url;
    }

    const updatedData = {
      titolo,
      contenuto,
      ...(immagineUrl && { immagine: immagineUrl }), // Aggiungi immagine solo se presente
    };
    console.log(updatedData);
    
    const announcement = await Announcement.findByIdAndUpdate(id, updatedData, { new: true });

    if (!announcement) {
      return res.status(404).json({ message: "Annuncio non trovato" });
    }

    res.status(200).json({ message: "Annuncio aggiornato con successo", announcement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Elimina un annuncio
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ message: "Annuncio non trovato" });
    }

    res.status(200).json({ message: "Annuncio eliminato con successo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

