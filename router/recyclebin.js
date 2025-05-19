const express = require('express');
const validateSession = require('../middlewares/validateSession');
const ControllerEliminated = require('../controllers/ControllerEliminated');
const ControllerCarreer = require('../controllers/ControllerCarreer');
const ControllerFaculty = require('../controllers/ControllerFaculty');
const ControllerSchool = require("../controllers/ControllerSchool");
const ControllerTeacher = require("../controllers/ControllerTeacher");
const ControllerStudyPlan = require("../controllers/ControllerStudyPlan");
const ControllerCourseProgram = require("../controllers/ControllerCourseProgram");
const ControllerUser = require("../controllers/ControllerUser");


const recyclebin = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/recyclebin")
        .get(async (req, res) => {
        if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerEliminated(); 
            const eliminatedData = await controller.getAllEliminated();
            const eliminatedDataObj = typeof eliminatedData === 'string' ? JSON.parse(eliminatedData) : eliminatedData;
           // console.log(eliminatedDataObj.Careers);
            response.data = eliminatedDataObj;
            response.code = "200";
            res.send(response);
        })
        .patch(async (req, res) => {
            // if (!(await validateSession(req, res, response))) return;
            try {
                const results = {
                    success: [],
                    errors: []
                };
                
                // Process Careers
                if (req.body.data?.Careers?.length > 0) {
                    const careers = req.body.data.Careers;
                    const careerController = new ControllerCarreer();
                    
                    for (const career of careers) {
                        try {
                            const result = await careerController.updateCarreerByID(
                                career["NOMBRE DE LA CARRERA"], 
                                career["CODIGO"], 
                                career["ID_SCHOOL"], 
                                req.session?.usernameData?.[0]?.ID_USER, // Usando un valor predeterminado si no hay sesión
                                career["STATE"], 
                                career["ID_CAREER"]
                            );
                            
                            if (result !== false) {
                                results.success.push({
                                    type: "Career",
                                    id: career["ID_CAREER"],
                                    message: "La carrera fue Actualizada correctamente"
                                });
                            } else {
                                results.errors.push({
                                    type: "Career",
                                    id: career["ID_CAREER"],
                                    message: "La carrera No fue Actualizada"
                                });
                            }
                        } catch (error) {
                            results.errors.push({
                                type: "Career",
                                id: career["ID_CAREER"],
                                message: "Error al actualizar la carrera: " + error.message
                            });
                        }
                    }
                }
                
                // Process Faculties
                if (req.body.data?.Faculties?.length > 0) {
                    const faculties = req.body.data.Faculties;
                    const facultyController = new ControllerFaculty();
                    
                    for (const faculty of faculties) {
                        try {
                            const result = await facultyController.updateFacultyByID(
                                faculty["NOMBRE FACULTAD"], 
                                req.session?.usernameData?.[0]?.ID_USER,
                                "1", 
                                faculty["ID_FACULTY"]
                            );
                            
                            if (result !== false) {
                                results.success.push({
                                    type: "Faculty",
                                    id: faculty["ID_FACULTY"],
                                    message: "La facultad fue Actualizada correctamente"
                                });
                            } else {
                                results.errors.push({
                                    type: "Faculty",
                                    id: faculty["ID_FACULTY"],
                                    message: "La facultad No fue Actualizada"
                                });
                            }
                        } catch (error) {
                            results.errors.push({
                                type: "Faculty",
                                id: faculty["ID_FACULTY"],
                                message: "Error al actualizar la facultad: " + error.message
                            });
                        }
                    }
                }
                
                if (req.body.data?.Schools?.length > 0) {
                    const schools = req.body.data.Schools;
                    const schoolController = new ControllerSchool();
                    
                    for (const school of schools) {
                        try {
                            const result = await schoolController.updateschoolByID(
                                school["NOMBRE ESCUELA"],
                                school["NOMBRE FACULTAD"],
                                req.session?.usernameData?.[0]?.ID_USER,
                                "1", 
                                school["ID_SCHOOL"]
                            );
                            if (result !== false) {
                                results.success.push({
                                    type: "School",
                                    id: school["ID_SCHOOL"],
                                    message: "La escuela fue Actualizada correctamente"
                                });
                            } else {
                                results.errors.push({
                                    type: "School",
                                    id: school["ID_SCHOOL"],
                                    message: "La escuela No fue Actualizada correctamente"
                                });
                            }
                        } catch (error) {
                            results.errors.push({
                                type: "School",
                                id: school["ID_SCHOOL"],
                                message: "Error al actualizar la escuela: " + error.message
                            });
                        }
                    }
                }

                if (req.body.data?.Teachers?.length > 0) {
                    const teachers = req.body.data.Teachers;
                    const teacherController = new ControllerTeacher();

                    for (const teacher of teachers) {
                        try {
                            const result = await teacherController.updateTeacherByID(
                                teacher["ID_TEACHER"],
                                teacher["NOMBRE"],
                                teacher["APELLIDOS"],
                                teacher["CEDULA"],
                                teacher["CORREO"],
                                req.session?.usernameData?.[0]?.ID_USER,
                                "1"
                            );
                            if (result !== false) {
                                results.success.push({
                                    type: "Teacher",
                                    id: teacher["ID_TEACHER"],
                                    message: "El docente fue Actualizado correctamente"
                                });
                            } else {
                                results.errors.push({
                                    type: "Teacher",
                                    id: teacher["ID_TEACHER"],
                                    message: "El docente No fue Actualizado correctamente"
                                });
                            }
                        } catch (error) {
                            results.errors.push({
                                type: "Teacher",
                                id: teacher["ID_TEACHER"],
                                message: "Error al actualizar el docente: " + error.message
                            });
                        }
                    }
                }

                if (req.body.data?.StudyPlans?.length > 0) {
                    const studyPlans = req.body.data.StudyPlans;
                    const studyPlanController = new ControllerStudyPlan();

                    for (const plan of studyPlans) {
                        try {
                            const result = await studyPlanController.updateStudyPlanByID(
                                plan["DSC_NAME"],
                                plan["DAT_INIT"],
                                plan["DAT_MAX"],
                                plan["ID_CAREER"],
                                req.session?.usernameData?.[0]?.ID_USER,
                                plan["PDF_URL"],
                                plan["STATE"],
                                plan["ID_STUDY_PLAN"]
                            );                 
                            if (result !== false) {
                                results.success.push({
                                    type: "StudyPlan",
                                    id: plan["ID_STUDY_PLAN"],
                                    message: "El plan de estudios fue Actualizado correctamente"
                                });
                            } else {
                                results.errors.push({
                                    type: "StudyPlan",
                                    id: plan["ID_STUDY_PLAN"],
                                    message: "El plan de estudios No fue Actualizado correctamente"
                                });
                            }
                        } catch (error) {
                            results.errors.push({
                                type: "StudyPlan",
                                id: plan["ID_STUDY_PLAN"],
                                message: "Error al actualizar el plan de estudios: " + error.message
                            });
                        }
                    }
                }

                if (req.body.data?.ProgramCourses?.length > 0) {
                    const programCourses = req.body.data.ProgramCourses;
                    const programCourseController = new ControllerCourseProgram();

                    for (const course of programCourses) {
                        try {
                            const result = await programCourseController.updateProgramCourseByID(
                                course["NOMBRE DEL PROGRAMA"],
                                course["AÑO"],
                                course["ID_STUDY_PLAN"],
                                course["NRC"],
                                course["CICLO"],
                                course["NUMERO DE CREDITOS"],
                                course["FIRMA DIGITAL"],
                                req.session?.usernameData?.[0]?.ID_USER,
                                course["PDF"],
                                course["STATE"],
                                course["ID_COURSE_PROGRAM"]
                            );
                            if (result !== false) {
                                results.success.push({
                                    type: "ProgramCourse",
                                    id: course["ID_COURSE_PROGRAM"],
                                    message: "El programa del curso fue Actualizado correctamente"
                                });
                            } else {
                                results.errors.push({
                                    type: "ProgramCourse",
                                    id: course["ID_COURSE_PROGRAM"],
                                    message: "El programa del curso no fue Actualizado correctamente"
                                });
                            }
                        } catch (error) {
                            results.errors.push({
                                type: "ProgramCourse",
                                id: course["ID_PROGRAM_COURSE"],
                                message: "Error al actualizar el programa del curso: " + error.message
                            });
                        }
                    }
                }
                
            // El de users esta comendato porque el patch de su controller recibe pass, y pues es esa no está en el diccionatio que devuelvo en el otro endpoint. 
                /*
                if (req.body.data?.Users?.length > 0) {
                    const users = req.body.data.Users;
                    const userController = new ControllerUser();

                    for (const user of users) {
                        try {
                            const result = await userController.updateUserByID(
                                user["ID_USER"],
                                user["NOMBRE"],
                                user["APELLIDOS"],
                                user["IDENTIFICACION"],
                                user["ROL"],
                                req.session?.usernameData?.[0]?.ID_USER,
                                user["STATE"],
                            );

                            if (result !== false) {
                                results.success.push({
                                    type: "User",
                                    id: user["ID_USER"],
                                    message: "El usuario fue actualizado correctamente"
                                });
                            } else {
                                results.errors.push({
                                    type: "User",
                                    id: user["ID_USER"],
                                    message: "El usuario no fue actualizado correctamente"
                                });
                            }
                        } catch (error) {
                            results.errors.push({
                                type: "User",
                                id: user["ID_USER"],
                                message: "Error al actualizar el usuario: " + error.message
                            });
                        }
                    }
                }
                */

                // Configurar la respuesta final
                if (results.errors.length === 0) {
                    response.data = {
                        message: "Todos los archivos fueron restaurados correctamente",
                        details: results
                    };
                    response.code = "200";
                } else {
                    response.data = {
                        message: "Hubo errores al restaurar algunos archivos",
                        details: results
                    };
                    response.code = "207"; // Multi-Status
                }
                
                // Enviar la respuesta una sola vez, al final
                res.send(response);
            } catch (error) {
                response.data = "Error al procesar la solicitud: " + error.message;
                response.code = "500";
                res.send(response);
            }
        })
}

module.exports = recyclebin;