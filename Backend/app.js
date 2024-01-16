import express from 'express';
import connectDB from './database.js';
import authRoutes from './src/routes/authRoutes.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Datenbankverbindung
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Standardkonfiguration ohne eingeschränkte Domains
app.use(morgan('dev')); // 'dev' ist ein vorkonfiguriertes Protokollformat

// Routen
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));