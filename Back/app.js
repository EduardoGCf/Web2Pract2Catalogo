const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const cors = require('cors');

// Importar las rutas correctamente
const usuarioRoutes = require('./routes/usuario.routes');  // Asegúrate de que esta ruta exista
const peliculaRoutes = require('./routes/pelicula.routes'); 
const personaRoutes = require('./routes/persona.routes'); 
const repartoRoutes = require('./routes/reparto.routes'); 

const app = express();

// Permitir solicitudes desde otros orígenes (CORS)
app.use(cors());

// Middleware para parsear el body de las solicitudes en formato JSON
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'mi_secreto_super_seguro',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: db.sequelize // Asegúrate de que db.sequelize esté correctamente configurado
    }),
    cookie: { maxAge: 60000 * 60 }  // Sesión válida por 1 hora
}));

// Middleware para que la sesión de usuario esté disponible en todas las vistas
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});

// Rutas
app.use('/api/usuarios', usuarioRoutes);     // Rutas de gestión de usuarios
app.use('/api/peliculas', peliculaRoutes);   // Rutas de gestión de películas
app.use('/api/personas', personaRoutes);     // Rutas de gestión de personas (actores/directores)
app.use('/api/reparto', repartoRoutes);      // Rutas para asociar actores/directores a películas

// Manejar errores de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send("Recurso no encontrado");
});

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

module.exports = app;
