module.exports.verificarAdministrador = (req, res, next) => {
    // Verificamos si hay un usuario autenticado y si es administrador
    if (req.session && req.session.usuarioId) {
        const usuario = req.session.usuario;

        if (usuario && usuario.rol === 'Administrador') {
            return next();  // Permitir acceso si es administrador
        }
    }
    return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
};
