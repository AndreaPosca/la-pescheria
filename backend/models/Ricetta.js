import mongoose from 'mongoose';

const ricettaSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  ingredienti: [{ type: String, required: true }], // Cambia ingredienti in array di stringhe
  preparazione: { type: String, required: true },
  tempoPreparazione: { type: String, required: true },
  immagine: { type: String }, // URL dell'immagine da Cloudinary
});

const Ricetta = mongoose.model('Ricetta', ricettaSchema);
export default Ricetta;
