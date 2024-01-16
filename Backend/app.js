const express = require('express');
const connectDB = require('./database');
const authRoutes = require('./authRoutes');
const cors = require('cors');
const morgan = require('morgan');

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