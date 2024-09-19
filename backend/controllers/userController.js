import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Assicurati che il percorso sia corretto

// Login utente con JWT
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Cerca l'utente per email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    // Genera un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, // payload (includi il ruolo dell'utente se necessario)
      process.env.JWT_SECRET, // la tua chiave segreta (definisci una variabile d'ambiente con il segreto)
      { expiresIn: '1h' } // scadenza del token
    );

    // Restituisci il token al frontend
    return res.status(200).json({
      message: 'Login eseguito con successo',
      token,// restituisci il token al frontend
      user, 
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

// Registrazione utente
export const registerUser = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    // Controlla se l'email è già registrata
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Utente già registrato" });
    }

    // Crea un nuovo utente
    const newUser = new User({ email, password, username});
    await newUser.save();

    res.status(201).json({
      message: "Utente registrato con successo",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};


export const logoutUser = (req, res) => {
  // La tua logica per il logout
};

export const checkSession = (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    return res.status(401).json({ loggedIn: false, message: "Utente non loggato" });
  }
};

