const express = require('express');
const middlewares = require("./middlewares/middlewares");
const ControllerUsers = require('./controllers/ControllerUsers');
const session = require('./router/Session');
const app = express();
const port = 3001;
app.use(express.json());

// Aplica los middlewares
middlewares(app);

//index servira los datos del index
app.get('/index', (req, res) => {
  res.contentType('application/json');
  console.debug(req.session);
  res.send(JSON.stringify({ mensaje: 'Hola mundo EduPlanPro!' }));
});

/**
 * sessiones
 */
session(app);

/**
 * levanta el puerto 
 * */
app.listen(port, () => {
  console.log(`https://localhost:${port}`);
})