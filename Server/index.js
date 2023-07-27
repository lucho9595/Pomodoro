const app = require('./app');
const prisma = require('./db');

const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
prisma.$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); // Salir con un código de error
  });