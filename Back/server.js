const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
