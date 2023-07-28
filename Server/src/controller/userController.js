const prisma = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUsers(req, res) {
    try {
        const usuarios = await prisma.usuarios.findMany();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Usuarios no encontrados" });
    }
};

async function getUser(req, res) {
    try {
        const { id } = req.params;
        const usuario = await prisma.usuarios.findUnique({
            where: { id: parseInt(id) },
        });
        if (!usuario) {
            res.status(404).json({ msg: "No se encuentra ese usuario" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Usuario no encontrado" });
    }
};

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const alreadyExistsMail = await prisma.usuarios.findFirst({
            where: { email: email },
        });

        if (alreadyExistsMail) {
            console.log('Email already registered');
            res.status(400).send('Email already registered');
            return;
        };

        const alreadyExistsUsername = await prisma.usuarios.findFirst({
            where: { username: username },
        });

        if (alreadyExistsUsername) {
            console.log('Username already registered');
            res.status(400).send('Username already registered');
            return;
        };
        // Aplicar bcrypt al hashear la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = await prisma.usuarios.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword, // Guardar la contraseña hasheada en lugar de la contraseña en texto plano
            },
        });

        res.status(200).json({ msg: 'Usuario creado', nuevoUsuario });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'No se pudo crear el usuario' });
    }
};

async function editUser(req, res) {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const usuario = await prisma.usuarios.findUnique({
            where: { id: parseInt(id) },
        });

        if (usuario) {
            const salt = await bcrypt.genSalt(10);
            const cryptPassword = await bcrypt.hash(password, salt);

            const updatedUser = await prisma.usuarios.update({
                where: { id: parseInt(id) },
                data: {
                    username: username,
                    email: email,
                    password: cryptPassword,
                },
            });

            return res.status(200).json({ msg: "El usuario fue actualizado con éxito", usuario: updatedUser });
        };

        return res.status(404).json({ msg: "El usuario no existe" });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Error al actualizar el usuario" });
    }
};

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        // Verificar si el usuario existe en la base de datos
        const usuario = await prisma.usuarios.findUnique({
            where: { email: email },
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar un token de autenticación
        const token = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '10h' });

        res.json({ token, user: usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const usuario = await prisma.usuarios.findUnique({
            where: { id: parseInt(id) },
        });

        if (usuario) {
            await prisma.usuarios.delete({
                where: { id: parseInt(id) },
            });

            return res.status(200).json({ msg: `Usuario eliminado con éxito` });
        }

        res.status(404).json({ msg: "El usuario no existe" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Error al eliminar el usuario" });
    }
};

module.exports = {
    getUsers,
    getUser,
    editUser,
    createUser,
    loginUser,
    deleteUser
};