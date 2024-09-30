const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuario', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.ENUM('Usuario común', 'Administrador'),
            defaultValue: 'Usuario común'  // Por defecto, los nuevos usuarios son 'Usuario común'
        }
    });

    // Antes de guardar un usuario, encripta la contraseña
    Usuario.beforeCreate(async (usuario, options) => {
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
    });

    return Usuario;
};
