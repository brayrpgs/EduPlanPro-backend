const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const middlewares = (app) => {
    app.use(express.json({ limit: '50mb', extended: true }));
    app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
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