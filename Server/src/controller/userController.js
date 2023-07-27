const UserModel = require('../models/User');

async function getUsers(req, res) {
    try {
        const Usuarios = await UserModel.findAll();
        res.status(200).json(Usuarios);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Usuarios no encontrados" })
    }
};

async function getUser(req, res) {
    try {
        const { id } = req.params
        const usuario = await UserModel.findOne({ where: { id: id } });
        if (!usuario) {
            res.status(404).json({ msg: "No se encuentra ese usuario" })
        }
        res.status(200).json(usuario)
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Usuario no encontrados" })
    }
};

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const alreadyExistsMail = await UserModel.findAll({
            where: { email: email },
        });

        if (alreadyExistsMail.length) {
            console.log('Email already registered');
            res.status(400).send('Email already registered');
            return;
        };

        const alreadyExistsUsername = await UserModel.findAll({
            where: { username: username },
        });

        if (alreadyExistsUsername.length) {
            console.log('Username already registered');
            res.status(400).send('Username already registered');
            return;
        };

        const nuevoUsuario = await UserModel.create({
            username: username,
            email: email,
            password: password
        });

        res.status(200).json({ msg: 'Usuario creado', nuevoUsuario });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'No se pudo crear el usuario' })
    }
};

async function editUser(req, res) {

};

async function loginUser(req, res) {

};

async function deleteUser(req, res) {

};


module.exports = {
    getUsers,
    getUser,
    editUser,
    createUser,
    loginUser,
    deleteUser
};