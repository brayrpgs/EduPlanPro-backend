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
            const result = await controller.insertTeacher(req.body.name, req.body.secName, req.body.idcard, req.session.usernameData[0].ID_USER, req.body.email)
            if (result === true) {
                response.data = "El Profesor fue creado correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "El Correo del Profesor ya Existe";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
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
            if (await controller.deleteTeacherByID(req.body.id) !== false) {
                response.data = "El Profesor fue Eliminado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Profesor No fue eliminado";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerTeacher();
            const result = await controller.updateTeacherByID(req.body.id, req.body.name, req.body.secName, req.body.idcard, req.body.email, req.session.usernameData[0].ID_USER, req.body.stat);
            console.log(result);
            if (result === true) {
                response.data = "El Profesor fue Actualizado correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            } 
            else {
                response.data = "El Profesor No fue Actualizado";
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