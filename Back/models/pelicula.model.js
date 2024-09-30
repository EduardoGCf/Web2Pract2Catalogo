module.exports = (sequelize, DataTypes) => {
    const Pelicula = sequelize.define('pelicula', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sinopsis: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fechaLanzamiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        calificacionRT: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        trailerYoutube: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Pelicula;
};
