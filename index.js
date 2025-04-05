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
const schoolphone = require('./router/schoolphone');
const searchfacultyphone = require('./router/searchfacultyphone');
const courseprogram = require('./router/courseprogram');
const teachercourseprogram = require('./router/teachercourseprogram');
const searchcourseprogram = require('./router/searchcourseprogram');
const reports = require('./router/reports');
const backup = require('./services/backupService');
const preferences = require('./router/preferences');
const forgotPassword = require('./router/forgotPassoword');
const app = express();
const port = 3001;
/*hay que moverlo luego*/
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
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
 * modulo de busquedas de telefonos y facultades
 */
searchfacultyphone(app);

/**
 * modulo relacional de telefonos y facultades
 */
schoolphone(app);

/*
  Modulo de recuperacion de contraseña
*/
forgotPassword(app);

/**
 * modulo de busquedas de programas del curso
 */
searchcourseprogram(app);

/**
 * modulo de programas del curso
 */
courseprogram(app)

/**
 * modulo relacional de programas del curso y profesores
 */
teachercourseprogram(app);


/**
 * modulo de reportes
 */
reports(app);

/**
 * modulo de backups
 */
backup(app);

/**
 * modulo depreferencias
 */
preferences(app);

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