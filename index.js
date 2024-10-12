const express = require('express')
const app = express()
const port = 3000

//falta agregar midelware como cors
app.get('/', (req, res) => {
  res.send('Hola mundo EduPlanPro!')
})

//levanta el puerto 
app.listen(port, () => {
  console.log(`https://localhost:${port}`)
})