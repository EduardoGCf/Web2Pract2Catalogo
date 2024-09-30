// persona.model.js
module.exports = (sequelize, DataTypes) => {
    const Persona = sequelize.define('Persona', {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      biografia: {
        type: DataTypes.TEXT,
      },
      foto: {
        type: DataTypes.STRING,
      },
    });
  
    return Persona;
  };
  