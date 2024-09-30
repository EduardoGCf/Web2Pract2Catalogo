const db = require('../models');
const Usuario = db.usuarios;
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario (registro)
exports.registrarUsuario = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    try {
        // Verificar si ya existe un usuario con el mismo correo
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        // Crear nuevo usuario con la contraseña encriptada
        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contraseña: contraseñaEncriptada
        });

        res.status(201).json({ message: "Usuario registrado con éxito.", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al registrar el usuario." });
    }
};

// Iniciar sesión de usuario
exports.iniciarSesion = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos." });
        }

        // Verificar la contraseña
        const esContraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esContraseñaValida) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos." });
        }

        // Guardar el ID y rol del usuario en la sesión
        req.session.usuarioId = usuario.id;
        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol  // Almacenar el rol del usuario en la sesión
        };

        res.status(200).json({ message: "Inicio de sesión exitoso.", usuario });
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al iniciar sesión." });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al obtener los usuarios." });
    }
};

// Obtener un usuario por su ID
exports.obtenerUsuarioPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al obtener el usuario." });
    }
};

// Actualizar un usuario por su ID
exports.actualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const { nombre, correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Actualizar los datos del usuario
        usuario.nombre = nombre || usuario.nombre;
        usuario.correo = correo || usuario.correo;

        if (contraseña) {
            const salt = await bcrypt.genSalt(10);
            usuario.contraseña = await bcrypt.hash(contraseña, salt);
        }

        await usuario.save();
        res.status(200).json({ message: "Usuario actualizado con éxito.", usuario });
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al actualizar el usuario." });
    }
};

// Eliminar un usuario por su ID
exports.eliminarUsuario = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        await usuario.destroy();
        res.status(200).json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al eliminar el usuario." });
    }
};
