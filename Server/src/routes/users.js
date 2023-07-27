const express = require('express');
const router = express.Router();
const { getUser,
    getUsers,
    deleteUser,
    createUser,
    loginUser,
    editUser } = require('../controller/userController.js');

//USUARIOS
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/login", loginUser);
router.post("/register", createUser);
router.put("/users/:id", editUser);
router.put("/users/:id", deleteUser);
