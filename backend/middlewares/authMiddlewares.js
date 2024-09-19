import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Estrai correttamente il token

  if (!token) {
    return res.status(401).json({ message: 'Token mancante o non valido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Aggiungi le informazioni dell'utente alla richiesta
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token non valido o scaduto' });
  }
};

export default requireAuth;
