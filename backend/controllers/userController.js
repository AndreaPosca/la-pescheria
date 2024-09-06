// Importa il modello User
import User from '../models/User.js';

// Registrazione utente senza JWT e bcrypt
export const registerUser = async (req, res, next) => {
    const { nome, cognome, email, dataNascita, username, password } = req.body;

    try {
        // Controlla se l'email è già registrata
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Utente già registrato" });
        }

        // Crea un nuovo utente
        const newUser = new User({
            nome,
            cognome,
            email,
            dataNascita,
            username,
            password, // Salva la password in chiaro (per ora, senza bcrypt)
        });

        await newUser.save();

        // Salva l'utente nella sessione
        req.session.user = newUser;

        res.status(201).json({
            message: "Utente registrato con successo",
            success: true,
        });
    } catch (err) {
        next(err);
    }
};

// Login utente senza JWT e bcrypt
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Cerca l'utente per email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Credenziali non valide" });
        }

        // Confronta la password senza bcrypt
        if (user.password !== password) {
            return res.status(400).json({ message: "Credenziali non valide" });
        }

        // Salva l'utente nella sessione
        req.session.user = user;

        res.status(200).json({
            message: "Login eseguito con successo",
            success: true,
        });
    } catch (err) {
        next(err);
    }
};

// Logout utente
export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Errore durante il logout" });
        }
        res.clearCookie('connect.sid'); // Cancella il cookie di sessione
        res.status(200).json({ message: "Logout eseguito con successo" });
    });
};
