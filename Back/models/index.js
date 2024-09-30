const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

// Conexión a la base de datos
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql',
    port: dbConfig.PORT,
    logging: false,
});

const db = {};

// Modelos
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.peliculas = require('./pelicula.model')(sequelize, Sequelize);
db.personas = require('./persona.model')(sequelize, Sequelize);
db.reparto = require('./reparto.model')(sequelize, Sequelize);
db.usuarios = require('./usuario.model')(sequelize, Sequelize);

// Asociaciones en `index.js`
db.peliculas.belongsToMany(db.personas, { through: db.reparto, foreignKey: 'peliculaId' });
db.personas.belongsToMany(db.peliculas, { through: db.reparto, foreignKey: 'personaId' });
// Asegúrate de que las asociaciones sean correctas
db.reparto.belongsTo(db.peliculas, { foreignKey: 'peliculaId' });
db.reparto.belongsTo(db.personas, { foreignKey: 'personaId' });
db.peliculas.hasMany(db.reparto, { foreignKey: 'peliculaId' });
db.personas.hasMany(db.reparto, { foreignKey: 'personaId' });

// Sincroniza la base de datos
db.sequelize.sync({ force: false })  // Esto eliminará y volverá a crear las tablas
  .then(() => {
    console.log("Base de datos resincronizada.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


module.exports = db;
