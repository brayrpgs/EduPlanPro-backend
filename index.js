const express = require('express');
const middlewares = require("./middlewares/middlewares");
const ControllerUsers = require('./controllers/ControllerUsers');
const app = express();
const port = 3001;
app.use(express.json());

// Aplica los middlewares
middlewares(app);

/**
 * El rutado inicial de la apliccion 
 */
//index servira los datos del index
app.get('/index', (req, res) => {
  res.contentType('application/json');
  console.debug(req.session);
  res.send(JSON.stringify({ mensaje: 'Hola mundo EduPlanPro!' }));
});

// Ruta para iniciar la sesión y asignar una variable de sesión
app.post('/login', async (req, res) => {
  const controller = new ControllerUsers();
  req.session.usernameData = await controller.auth(req.body.idcard, req.body.password);
  const response = {
    "data" : "Sesión iniciada y username asignado",
    "code" : "200"
  };
  res.json(response);
});

// Ruta para acceder a la variable de sesión
app.get('/dashboard', (req, res) => {
  if (req.session.username) {
    res.send(`Bienvenida, ${req.session.username}`);
  } else {
    res.send('Por favor inicia sesión');
  }
});

// Ruta para cerrar la sesión
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar la sesión');
    }
    res.send('Sesión cerrada');
  });
});

/**
 * levanta el puerto 
 * */
app.listen(port, () => {
  console.log(`https://localhost:${port}`);
})