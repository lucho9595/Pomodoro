const express = require('express');
const router = express.Router();
const { getUser,
    getUsers,
    deleteUser,
    createUser,
    loginUser,
    editUser } = require('../controller/userController.js');

//USUARIOS
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/register", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;