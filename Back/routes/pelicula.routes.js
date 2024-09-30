const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/pelicula.controller');

// Crear una nueva película
router.post('/', peliculaController.crearPelicula);

// Obtener todas las películas
router.get('/', peliculaController.obtenerPeliculas);
// Obtener todas las películas list
router.get('/list', peliculaController.obtenerPeliculasList);

// Obtener una película por ID
router.get('/:id', peliculaController.obtenerPeliculaPorId);

// Actualizar una película por ID
router.put('/:id', peliculaController.actualizarPelicula);

// Eliminar una película por ID
router.delete('/:id', peliculaController.eliminarPelicula);

module.exports = router;
