import express from 'express';
import ToDo from '../models/ToDo.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Alle ToDos eines Benutzers abrufen
router.get('/', protect, async (req, res) => {
  try {
    const todos = await ToDo.find({ user: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).send('Fehler beim Abrufen der ToDos.');
  }
});

// Neues ToDo hinzufügen
router.post('/', protect, async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new ToDo({ text, user: req.user.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).send('Fehler beim Erstellen des ToDo.');
  }
});

// ToDo aktualisieren
router.put('/:id', protect, async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = await ToDo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { text, completed },
      { new: true }
    );
    if (!todo) {
      return res.status(404).send('ToDo nicht gefunden.');
    }
    res.json(todo);
  } catch (error) {
    res.status(500).send('Fehler beim Aktualisieren des ToDo.');
  }
});

// ToDo löschen
router.delete('/:id', protect, async (req, res) => {
  try {
    const todo = await ToDo.findOneAndDelete({ _id: req.params
        .id, user: req.user.userId });
        if (!todo) {
        return res.status(404).send('ToDo nicht gefunden.');
        }
        res.status(200).send('ToDo erfolgreich gelöscht.');
        } catch (error) {
        res.status(500).send('Fehler beim Löschen des ToDo.');
        }
        });
        
export default router;