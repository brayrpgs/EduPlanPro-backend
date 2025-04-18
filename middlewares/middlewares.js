const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const middlewares = (app) => {
   
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    // Middleware para loggear y depurar las solicitudes
    app.use(morgan('dev'));
    app.use(session({
        secret: 'EDUPLANPRO',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    

};
module.exports = middlewares;