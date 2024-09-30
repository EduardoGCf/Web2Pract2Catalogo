const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { verificarAdministrador } = require('../middleware/auth.middleware');

// Registrar un nuevo usuario (sin necesidad de ser administrador)
router.post('/registrar', usuarioController.registrarUsuario);

// Iniciar sesión de usuario (sin necesidad de ser administrador)
router.post('/login', usuarioController.iniciarSesion);

// Obtener todos los usuarios (solo administradores)
router.get('/', usuarioController.obtenerUsuarios);

// Obtener un usuario por su ID (solo administradores)
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Actualizar un usuario por su ID (solo administradores)
router.put('/:id', usuarioController.actualizarUsuario);

// Eliminar un usuario por su ID (solo administradores)
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
