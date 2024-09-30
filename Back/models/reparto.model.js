module.exports = (sequelize, DataTypes) => {
  const Reparto = sequelize.define('Reparto', {
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peliculaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Peliculas',
        key: 'id'
      }
    },
    personaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Personas',
        key: 'id'
      }
    }
  });

  return Reparto;
};
