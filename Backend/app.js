import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './src/routes/authRoutes.js';
import todoRoutes from './src/routes/todoRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Datenbankverbindung
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB verbunden');
}).catch(err => {
    console.error('MongoDB Verbindungsfehler:', err);
});

// Routen
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

export default app;
