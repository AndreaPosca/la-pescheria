const adminMiddleware = (req, res, next) => {
    const user = req.session.user;
  
    if (user && user.role === 'admin') {
      return next();
    }
  
    return res.status(403).json({ message: 'Accesso negato: solo gli amministratori possono eseguire questa azione' });
  };
  
  export default adminMiddleware;
  