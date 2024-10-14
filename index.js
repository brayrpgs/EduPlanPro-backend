const express = require('express')
const morgan = require('morgan')
/**
 * midelwares
 */
// Morgan para loggear y depurar las solicitudes 
const app = express()
const port = 3000
app.use(morgan('dev'));

/**
 * el rutado inicial
 */
//index servira los datos del index
app.get('/index', (req, res) => {
  res.contentType('application/json');
  res.send(JSON.stringify({ mensaje: 'Hola mundo EduPlanPro!' }));
});

/**
 * levanta el puerto 
 * */
app.listen(port, () => {
  console.log(`https://localhost:${port}`)
})