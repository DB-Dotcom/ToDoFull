import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Vor dem Speichern des Benutzers wird das Passwort verschlüsselt
userSchema.pre('save', async function(next) {
  // Nur verschlüsseln, wenn das Passwort geändert wurde
  if (!this.isModified('password')) return next();

  // Generieren eines Salts und Verschlüsseln des Passworts
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Methode zum Überprüfen des Passworts bei der Anmeldung
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
