const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Rutas para los usuarios
app.use('/', usersRoutes);

module.exports = app;