const rutesError = (app) => {
    app.use((req, res, next) => {
        res.status(404).send({ error: 'Ruta no encontrada', code: 404 });
    });
}
module.exports = rutesError