const express = require('express');
const middlewares = require("./middlewares/middlewares");
const rutesError = require('./router/rutesError');
const person = require('./router/person');
const session = require('./router/Session');
const faculty = require('./router/faculty');
const validateSession = require('./middlewares/validateSession');
const app = express();
const port = 3001;
app.use(express.json());

/**
 * modulo middelwares
 */
middlewares(app);

/**
 * modulo de sessiones
 */
session(app);

/**
 * modulo de personas
 */
person(app);

/**
 * modulo de facultades
 */
faculty(app);

/**
 * modulo de captura de rutas erroneas
 * siempre al final
 */
rutesError(app);

/**
 * levanta el puerto 3001
 * */
app.listen(port, () => {
  console.log(`https://localhost:${port}`);
})