import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Benutzerregistrierung
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Benutzername bereits vergeben.');
    }

    // Verschlüsseln des Passworts
 /*    const salt = await bcrypt.genSalt(10); */
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).send('Benutzer erfolgreich registriert.');
  } catch (error) {
    res.status(500).send('Fehler bei der Registrierung des Benutzers.');
  }
});

// Benutzeranmeldung
router.post('/login', async (req, res) => {
  try {

    
    const { username, password } = req.body;

    // Benutzer suchen
    const user = await User.findOne({ username });
    if (!user) { 
      return res.status(400).send('Benutzername ist falsch.');
    }

    // Passwort überprüfen
    console.log(user.password, password)
  

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Passwort ist falsch.');
    }

    // JWT-Token erstellen
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Fehler bei der Anmeldung.');
  }
});

export default router;
