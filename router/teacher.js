const ControllerTeacher = require("../controllers/ControllerTeacher");
const validateSession = require("../middlewares/validateSession");

const teacher = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/teacher")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacher();
            if (await controller.insertTeacher(req.body.name, req.body.secName, req.body.idcard, req.session.usernameData[0].ID_USER, req.body.email) !== false) {
                response.data = "El Profesor fue creado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Profesor No fue creado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacher();
            response.data = await controller.getAllTeacher();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacher();
            if (await controller.deleteFacultyByID(req.body.id) !== false) {
                response.data = "La facultad fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La facultad No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacher();
            if (await controller.updateFacultyByID(req.body.desc, req.session.usernameData[0].ID_USER, req.body.stat, req.body.id) !== false) {
                response.data = "La facultad fue Actualizada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La facultad No fue Actualizada";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacher();
            res.send({ "code": "200" });
        });
}

module.exports = teacher;