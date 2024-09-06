import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser } from '../controllers/userController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Limita tentativi di login
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 5, // Limita a 5 tentativi per IP
  message: 'Troppi tentativi di login, riprova più tardi.',
});

// Rotta di registrazione
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Inserisci un indirizzo email valido').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('La password deve avere almeno 8 caratteri'),
  ],
  registerUser
);

// Rotta di login
router.post(
  '/login',
  loginRateLimiter,
  [
    body('email').isEmail().withMessage('Inserisci un indirizzo email valido').normalizeEmail(),
    body('password').notEmpty().withMessage('La password è obbligatoria'),
  ],
  loginUser
);

export default router;
