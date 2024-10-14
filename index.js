const express = require('express')
const morgan = require('morgan')
const connectDB = require('./data/ConnectionDB');



/**
 * midelwares
 */
// Morgan para loggear y depurar las solicitudes 
const app = express()
const port = 3000
app.use(morgan('dev'));

/**
 * en rutado inicial
 */
//index servira los datos del index
app.get('/index', (req, res) => {
  res.contentType('application/json');
  // Llamamos al método para conectarse a la base de datos 
  /**
   * @todo
   */
  connectDB();
  res.send(JSON.stringify({ mensaje: 'Hola mundo EduPlanPro!' }));
});

/**
 * levanta el puerto 
 * */
app.listen(port, () => {
  console.log(`https://localhost:${port}`)
})