const express = require('express');
const router = express.Router();
const repartoController = require('../controllers/reparto.controller');
const { verificarAdministrador } = require('../middleware/auth.middleware');

// Asociar una persona (actor o director) a una película
router.post('/asociar', repartoController.asociarPersona);

// Eliminar una persona del reparto de una película
router.post('/eliminar', repartoController.eliminarPersona);

// Actualizar el rol de una persona en el reparto
router.post('/actualizar', repartoController.actualizarRolPersona);

// Obtener el reparto completo de una película (con roles)
router.get('/pelicula/:peliculaId', repartoController.obtenerRepartoConRol);
// Obtener los directores de una película
router.get('/pelicula/:peliculaId/directores', repartoController.obtenerDirectores);

// Obtener los actores de una película
router.get('/pelicula/:peliculaId/actores', repartoController.obtenerActores);

module.exports = router;
