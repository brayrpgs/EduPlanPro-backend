
const ControllerCourseProgram = require("../controllers/ControllerCourseProgram");
const validateSession = require("../middlewares/validateSession");

const courseprogram = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/courseprogram")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCourseProgram();
            const result = await controller.insertCourseProgram(req.body.DSC_NAME,
                req.body.DAT_YEAR, req.body.ID_STUDY_PLAN, req.body.NRC, req.body.CICLE,
                req.body.NUM_CREDITS, req.body.SIGNATURE, req.session.usernameData[0].ID_USER, req.body.PDF_URL);
            if (result === true) {
                response.data = "El programa de curso fue creado correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "El programa de curso Ya Esta Registrado";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }
            else {
                response.data = "El programa de curso No fue creado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCourseProgram();
            response.data = await controller.getAllCourseProgram();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCourseProgram();
            if (await controller.deleteCourseProgramByID(req.body.id) !== false) {
                response.data = "El programa de curso fue elimonado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El programa de curso No fue eliminado";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCourseProgram();
            const result = await controller.updateCourseProgramByID(req.body.DSC_NAME,
                req.body.DAT_YEAR, req.body.ID_STUDY_PLAN, req.body.NRC, req.body.CICLE,
                req.body.NUM_CREDITS, req.body.SIGNATURE, req.session.usernameData[0].ID_USER, req.body.PDF_URL , req.body.ID_COURSE_PROGRAM ,req.body.STATE );

            if (result) {
                response.data = "El programa de curso fue Actualizado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El programa de curso No fue Actualizado";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCourseProgram();
            res.send({ "code": "200" });
        });
}
module.exports = courseprogram;