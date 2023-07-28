const express = require('express');
const app = express(); // Crea una instancia de Express

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Rutas para los usuarios
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

module.exports = app; // Exporta la instancia de Express
