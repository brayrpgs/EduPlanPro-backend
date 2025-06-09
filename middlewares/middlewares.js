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

    app.use((req, res, next) => {
        // Middleware para manejar errores de SQL Injection
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
            const forbiddenPattern = /['";\\\-‐‒–—―]+|--/g;
            for (const key in req.body) {
                if (typeof req.body[key] === 'string' && forbiddenPattern.test(req.body[key])) {
                    return res.status(400).json({ error: 'Input contains forbidden characters.' });
                }
            }
        }
        next();
    });
    

};
module.exports = middlewares;