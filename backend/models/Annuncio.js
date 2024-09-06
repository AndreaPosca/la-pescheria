import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  titolo: {
    type: String,
    required: true,
    trim: true,
  },
  contenuto: {
    type: String,
    required: true,
  },
  dataScadenza: {
    type: Date, // Data di scadenza dell'annuncio
  },
  immagine: {
    type: String, // URL dell'immagine (se presente)
  },
}, {
  timestamps: true, // Aggiunge createdAt e updatedAt
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
