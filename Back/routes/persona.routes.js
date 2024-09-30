const express = require('express');
const router = express.Router();
const personaController = require('../controllers/persona.controller');

// Crear una nueva persona
router.post('/', personaController.crearPersona);

// Obtener todas las personas
router.get('/', personaController.obtenerPersonas);

// Obtener una persona por su ID
router.get('/:id', personaController.obtenerPersonaPorId);

// Actualizar una persona por su ID
router.put('/:id', personaController.actualizarPersona);

// Eliminar una persona por su ID
router.delete('/:id', personaController.eliminarPersona);
router.get('/:id/peliculas', personaController.obtenerPeliculasPorPersona);

module.exports = router;
