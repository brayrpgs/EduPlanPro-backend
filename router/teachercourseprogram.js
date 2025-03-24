
const ControllerTeacherCourseProgram = require("../controllers/ControllerTeacherCourseProgram");
const validateSession = require("../middlewares/validateSession");

const teachercourseprogram = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/teachercourseprogram")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacherCourseProgram();
            const result = await controller.insertTeacherCourseProgram(req.body.ID_TEACHER, req.body.ID_COURSE_PROGRAM);
            if (result === true) {
                response.data = "El programa del curso fue asociado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El programa del curso no fue asociado correctamente";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacherCourseProgram();
            response.data = await controller.getAllTeacherCourseProgram();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacherCourseProgram();
            if (await controller.deleteTeacherCourseProgramByID(req.body.id) !== false) {
                response.data = "La asosiacion fue eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La asosiacion no pudo ser eliminada correctamente";;
                response.code = "400";
                res.send(response);
            }
        });
}
module.exports = teachercourseprogram;