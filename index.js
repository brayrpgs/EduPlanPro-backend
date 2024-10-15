const express = require('express');
const middlewares = require("./middlewares/middlewares");
const session = require('./router/session');
const rutesError = require('./router/rutesError');
const person = require('./router/person');
const app = express();
const port = 3001;
app.use(express.json());

/**
 * modulo middelwares
 */
middlewares(app);

//SE VA USAR LUEGO MAS ADELANTE NO BORRAR
/*
//index servira los datos del index
app.get('/index', (req, res) => {
  res.contentType('application/json');
  console.debug(req.session);
  res.send(JSON.stringify({ mensaje: 'Hola mundo EduPlanPro!' }));
});
*/

/**
 * modulo de sessiones
 */
session(app);

/**
 * modulo de personas
 */
person(app);

/**
 * modulo de captura de rutas erroneas
 */
rutesError(app);

/**
 * levanta el puerto 3001
 * */
app.listen(port, () => {
  console.log(`https://localhost:${port}`);
})