const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const User = prisma.user;

// Definición del modelo de usuario
const UserModel = {
  id: User.id,
  username: User.username,
  email: User.email,
  password: User.password,
};

module.exports = UserModel;