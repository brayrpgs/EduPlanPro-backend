const express = require('express');
const middlewares = require("./middlewares/middlewares");
const rutesError = require('./router/rutesError');
const session = require('./router/Session');
const faculty = require('./router/faculty');
const school = require('./router/school');
const searchfaculty = require('./router/searchfaculty');
const searchschool = require('./router/searchSchool');
const teacher = require('./router/teacher');
const rol = require('./router/Rol');
const user = require('./router/user');
const searchuser = require('./router/searchuser');
const searchteacher = require('./router/searchteacher');
const carreer = require('./router/carreer');
const studyPlan = require('./router/studyplan');
const phone = require('./router/phone');
const searchcarreer = require('./router/searchcarreer');
const searchstudyplan = require('./router/searchstudyplan');
const facultyphone = require('./router/FacultyPhone');
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
 * modulo de facultades
 */
faculty(app);

/**
 * modulo de facultades busqueda
 */
searchfaculty(app);

/**
 * modulo de escuelas
 */
school(app);

/**
 * modulo de busquedas de escuela
 */
searchschool(app);

/**
 * modulo de profesores
 */
teacher(app);

/**
 * modulo de busqueda de profesores
 */
searchteacher(app);

/**
 * modulo de roles
 */
rol(app);

/**
 * modulo de usuarios
 */
user(app);

/**
 * modulo de busquedas de usuarios
 */
searchuser(app);

/**
 * modulo de carreras
 */
carreer(app);

/**
 * modulo de busquedas de carreras
 */
searchcarreer(app);

/**
 * modulo de planes de estudio
 */
studyPlan(app);

/**
 * modulo de busquedas de carreras
 */
searchstudyplan(app);

/**
 * modulo de telefonos
 */
phone(app);

/**
 * modulo relacional de telefonos y facultades
 */
facultyphone(app);

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