import Announcement from '../models/Annuncio.js';

// Crea un nuovo annuncio
export const createAnnouncement = async (req, res, next) => {
  const { titolo, contenuto, dataScadenza, immagine } = req.body;

  try {
    const announcement = new Announcement({ titolo, contenuto, dataScadenza, immagine });
    await announcement.save();
    res.status(201).json({ message: "Annuncio creato con successo", announcement });
  } catch (error) {
    next(error);
  }
};

// Ottieni tutti gli annunci
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    next(error);
  }
};

// Aggiorna un annuncio esistente
export const updateAnnouncement = async (req, res, next) => {
  const { id } = req.params;
  const { titolo, contenuto, dataScadenza, immagine } = req.body;

  try {
    const announcement = await Announcement.findByIdAndUpdate(id, {
      titolo, contenuto, dataScadenza, immagine
    }, { new: true });

    if (!announcement) {
      return res.status(404).json({ message: "Annuncio non trovato" });
    }

    res.status(200).json({ message: "Annuncio aggiornato con successo", announcement });
  } catch (error) {
    next(error);
  }
};

// Elimina un annuncio
export const deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ message: "Annuncio non trovato" });
    }

    res.status(200).json({ message: "Annuncio eliminato con successo" });
  } catch (error) {
    next(error);
  }
};
