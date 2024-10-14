const morgan = require('morgan');
const session = require('express-session');

const middlewares = (app) => {
    // Middleware para loggear y depurar las solicitudes
    app.use(morgan('dev'));
    app.use(session({
        secret: 'EDUPLANPRO',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    
    // Middleware para manejar rutas no encontradas
    app.use((req, res, next) => {
        res.status(404).send({ error: 'Ruta no encontrada',code: 404 });
    });
    
};

module.exports = middlewares;