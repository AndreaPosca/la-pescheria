import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import endpoints from 'express-list-endpoints';


// Rotte
import userRoutes from './routes/userRoutes.js';
import annunciRoutes from './routes/annunciRoutes.js';


dotenv.config();

const app = express();

// Rate Limiting per sicurezza
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 100, // Limita ogni IP a 100 richieste per finestra di 15 minuti
  message: 'Troppe richieste effettuate dal tuo IP, riprova più tardi.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Configurazione CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Consenti richieste solo dal frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Consenti cookie
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());

// Connetti a MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connesso a MongoDB'))
  .catch((err) => console.error('Errore nella connessione a MongoDB', err));

// Rotte
app.use('/api/users', userRoutes);
app.use('/api/annunci', annunciRoutes);


// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server attivo sulla porta ${PORT}`);
  console.table(endpoints(app));
});

