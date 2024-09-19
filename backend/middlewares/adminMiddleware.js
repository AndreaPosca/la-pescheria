const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Procedi se l'utente è admin
  } else {
    res.status(403).json({ message: 'Accesso negato. Solo gli admin possono eseguire questa azione.' });
  }
};

export default adminMiddleware;
