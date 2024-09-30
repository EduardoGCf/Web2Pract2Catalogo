const db = require("../models"); // Asegúrate de que estés importando correctamente tu modelo
const Persona = db.personas;
const Reparto = db.reparto;
const Pelicula = db.peliculas;

// Crear una nueva persona
exports.crearPersona = async (req, res) => {
  const { nombre, apellido, biografia, foto } = req.body;
  try {
    const nuevaPersona = await Persona.create({
      nombre,
      apellido,
      biografia,
      foto,
    });
    res.status(201).json(nuevaPersona);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la persona", error });
  }
};

// Obtener todas las personas
exports.obtenerPersonas = async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las personas", error });
  }
};

// Obtener una persona por ID
exports.obtenerPersonaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const persona = await Persona.findByPk(id);
    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la persona", error });
  }
};

// Actualizar una persona
exports.actualizarPersona = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, biografia, foto } = req.body;
  try {
    const persona = await Persona.findByPk(id);
    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    persona.nombre = nombre || persona.nombre;
    persona.apellido = apellido || persona.apellido;
    persona.biografia = biografia || persona.biografia;
    persona.foto = foto || persona.foto;

    await persona.save();
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la persona", error });
  }
};

// Eliminar una persona
exports.eliminarPersona = async (req, res) => {
  const { id } = req.params;
  try {
    const persona = await Persona.findByPk(id);
    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    await persona.destroy();
    res.status(200).json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la persona", error });
  }
};
// Obtener todas las películas en las que una persona ha participado y su rol
exports.obtenerPeliculasPorPersona = async (req, res) => {
  const { id } = req.params; // ID de la persona

  try {
    const persona = await Persona.findByPk(id, {
      include: [
        {
          model: Pelicula,
          through: { attributes: ["rol"] }, // Incluye el rol desde el modelo Reparto
        },
      ],
    });

    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    // Retorna las películas con los roles asociados
    res.status(200).json(persona.peliculas);
  } catch (error) {
    console.error("Error al obtener las películas de la persona:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
