const db = require('../models');
const Pelicula = db.peliculas;
const Persona = db.personas;
const Reparto = db.reparto;


// Asociar una persona a una película (con un rol)
exports.asociarPersona = async (req, res) => {
  const { peliculaId, personaId, rol } = req.body;

  try {
    const pelicula = await Pelicula.findByPk(peliculaId);
    const persona = await Persona.findByPk(personaId);

    if (!pelicula || !persona) {
      return res.status(404).json({ message: "Película o persona no encontrada." });
    }

    // Verificar si la persona ya está en el reparto
    const existeReparto = await Reparto.findOne({ where: { peliculaId, personaId } });
    if (existeReparto) {
      return res.status(400).json({ message: "La persona ya está asociada a esta película." });
    }

    // Crear la relación en Reparto
    await pelicula.addPersona(persona, { through: { rol } });

    // Obtener los datos completos de la persona y la película para devolverlos
    const nuevaPersona = await Persona.findByPk(personaId, {
      attributes: ['id', 'nombre', 'apellido', 'foto'], // Aquí traemos solo los campos que necesitas
    });

    res.status(200).json({ message: "Persona asociada con éxito", persona: nuevaPersona, rol });
  } catch (error) {
    res.status(500).json({ message: error.message || "Ocurrió un error al asociar a la persona con la película." });
  }
};





// Obtener el reparto completo de una película
exports.obtenerReparto = async (req, res) => {
  const { peliculaId } = req.params;
  try {
      const pelicula = await Pelicula.findByPk(peliculaId, {
          include: [{
              model: Persona,
              through: { attributes: ['rol'] } // Rol de la persona en la película (desde Reparto)
          }]
      });

      if (!pelicula) {
          return res.status(404).json({ message: "Película no encontrada." });
      }

      // Retornar la lista de personas en el reparto
      res.status(200).json(pelicula.personas);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el reparto." });
  }
};
  
// Eliminar todo el reparto de una película
// Eliminar todo el reparto de una película
exports.eliminarTodoReparto = async (req, res) => {
    const { peliculaId } = req.body;

    try {
        const pelicula = await Pelicula.findByPk(peliculaId, {
            include: [Persona]
        });

        if (!pelicula) {
            return res.status(404).json({ message: "Película no encontrada." });
        }

        // Eliminar todas las asociaciones (reparto) de la película
        await pelicula.setPersonas([]);  // Esto elimina todas las relaciones con personas

        res.status(200).json({ message: "Todo el reparto ha sido eliminado de la película." });
    } catch (error) {
        res.status(500).json({ message: error.message || "Ocurrió un error al eliminar todo el reparto." });
    }
};


// Controlador para obtener el reparto con la persona asociada
exports.obtenerRepartoConRol = async (req, res) => {
  const { peliculaId } = req.params;

  try {
    const reparto = await Reparto.findAll({
      where: { peliculaId },
      include: [
        {
          model: Persona, // Asegúrate de que Persona esté bien relacionado
          attributes: ['id', 'nombre', 'apellido', 'foto'], // Verifica que estos campos existan en el modelo
        },
      ],
    });

    if (!reparto) {
      return res.status(404).json({ message: "No se encontró el reparto para esta película." });
    }

    res.status(200).json(reparto);
  } catch (error) {
    res.status(500).json({ message: "Ocurrió un error al obtener el reparto." });
  }
};


// Actualizar el rol de una persona en el reparto
exports.actualizarRolPersona = async (req, res) => {
  const { peliculaId, personaId, rol } = req.body;

  if (!peliculaId || !personaId || !rol) {
    return res.status(400).json({ message: "peliculaId, personaId y rol son requeridos." });
  }

  try {
    // Buscar la relación en la tabla de reparto
    const reparto = await Reparto.findOne({
      where: { peliculaId, personaId }
    });

    if (!reparto) {
      return res.status(404).json({ message: "No se encontró la relación de reparto entre la película y la persona." });
    }

    // Actualizar el rol
    reparto.rol = rol;
    await reparto.save();

    res.status(200).json({ message: "Rol actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    res.status(500).json({ message: "Ocurrió un error al actualizar el rol." });
  }
};


// Eliminar una persona del reparto
exports.eliminarPersona = async (req, res) => {
  const { peliculaId, personaId } = req.body;

  try {
    // Buscar la película y la persona por su ID
    const pelicula = await Pelicula.findByPk(peliculaId);
    const persona = await Persona.findByPk(personaId);

    if (!pelicula || !persona) {
      return res.status(404).json({ message: "Película o persona no encontrada." });
    }

    // Eliminar la relación de la tabla intermedia (reparto)
    await pelicula.removePersona(persona);

    res.status(200).json({ message: "Persona eliminada del reparto con éxito." });
  } catch (error) {
    console.error("Error al eliminar a la persona del reparto:", error);
    res.status(500).json({ message: "Ocurrió un error al eliminar a la persona del reparto." });
  }
};
// Obtener los directores de una película
exports.obtenerDirectores = async (req, res) => {
  const { peliculaId } = req.params;

  try {
    const directores = await Reparto.findAll({
      where: { peliculaId, rol: ['Director', 'ambos']  },
      include: [
        {
          model: Persona,
          attributes: ['id', 'nombre', 'apellido', 'foto']  // Asegúrate de incluir el campo 'id' aquí
        }
      ]
    });

    if (!directores) {
      return res.status(404).json({ message: "No se encontraron directores para esta película." });
    }

    res.status(200).json(directores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocurrió un error al obtener los directores." });
  }
};

// Obtener los actores de una película
exports.obtenerActores = async (req, res) => {
  const { peliculaId } = req.params;

  try {
    const actores = await Reparto.findAll({
      where: { peliculaId, rol: ['Actor', 'ambos']  },
      include: [
        {
          model: Persona,
          attributes: ['id', 'nombre', 'apellido', 'foto']  // Asegúrate de incluir el campo 'id' aquí
        }
      ]
    });

    if (!actores) {
      return res.status(404).json({ message: "No se encontraron actores para esta película." });
    }

    res.status(200).json(actores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocurrió un error al obtener los actores." });
  }
};

