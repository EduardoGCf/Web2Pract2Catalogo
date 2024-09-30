const db = require('../models');
const Pelicula = db.peliculas;
const Persona = db.personas; // Asegúrate de que 'Persona' esté importado correctamente

// Crear una nueva película
exports.crearPelicula = async (req, res) => {
    const { nombre, sinopsis, imagen, fechaLanzamiento, calificacionRT, trailerYoutube } = req.body;

    try {
        // Crear la película solo con los campos correspondientes
        const nuevaPelicula = await Pelicula.create({
            nombre,
            sinopsis,
            imagen,
            fechaLanzamiento,
            calificacionRT,
            trailerYoutube
        });

        res.status(201).json(nuevaPelicula);
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al crear la película." });
    }
};

exports.obtenerPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.findAll({
      order: [['calificacionRT', 'DESC']] // Ordenar por calificación de forma descendente
    });
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocurrió un error al obtener las películas."
    });
  }
};

// Obtener todas las películas
exports.obtenerPeliculasList = async (req, res) => {
    try {
      const peliculas = await Pelicula.findAll();  // Asegúrate de que esta consulta esté funcionando
      res.status(200).json(peliculas);
    } catch (error) {
      res.status(500).json({ message: error.message || "Ocurrió un error al obtener las películas." });
    }
  };

// Obtener una película por su ID
exports.obtenerPeliculaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const pelicula = await Pelicula.findByPk(id, {
      include: [{
        model: Persona,
        through: { attributes: ['rol'] }  // Incluye el rol desde la tabla intermedia "Reparto"
      }]
    });

    console.log(pelicula);  // Verifica los datos obtenidos

    if (!pelicula) {
      return res.status(404).json({ message: "Película no encontrada." });
    }

    res.status(200).json(pelicula);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los detalles de la película." });
  }
};


// Actualizar una película por su ID
exports.actualizarPelicula = async (req, res) => {
    const id = req.params.id;
    const { nombre, sinopsis, imagen, fechaLanzamiento, calificacionRT, trailerYoutube } = req.body;

    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: "Película no encontrada." });
        }

        // Actualizar los datos de la película (sin el reparto)
        pelicula.nombre = nombre || pelicula.nombre;
        pelicula.sinopsis = sinopsis || pelicula.sinopsis;
        pelicula.imagen = imagen || pelicula.imagen;
        pelicula.fechaLanzamiento = fechaLanzamiento || pelicula.fechaLanzamiento;
        pelicula.calificacionRT = calificacionRT || pelicula.calificacionRT;
        pelicula.trailerYoutube = trailerYoutube || pelicula.trailerYoutube;

        await pelicula.save();
        res.status(200).json({ message: "Película actualizada con éxito.", pelicula });
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al actualizar la película." });
    }
};

// Eliminar una película por su ID
exports.eliminarPelicula = async (req, res) => {
    const id = req.params.id;

    try {
        const pelicula = await Pelicula.findByPk(id);
        if (!pelicula) {
            return res.status(404).json({ message: "Película no encontrada." });
        }

        await pelicula.destroy();
        res.status(200).json({ message: "Película eliminada con éxito." });
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al eliminar la película." });
    }
};
