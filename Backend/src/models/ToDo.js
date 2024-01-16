import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Referenziert das User-Modell
  }
}, { timestamps: true }); // Automatisch erstellte Zeitstempel für Erstellung und letzte Änderung

const ToDo = mongoose.model('ToDo', todoSchema);

export default ToDo;
