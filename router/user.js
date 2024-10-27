const ControllerUser = require("../controllers/ControllerUser");
const validateSession = require("../middlewares/validateSession");

const user = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/user")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerUser();
            const result = await controller.insertUser(req.body.name, req.body.secName, req.body.idcard, req.session.usernameData[0].ID_USER, req.body.idRol, req.body.pass);
            if (result === true) {
                response.data = "El Usuario fue creado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Usuario No fue creado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerRol();
            response.data = await controller.getAllRol();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerRol();
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
            const controller = new ControllerRol();
            if (await controller.updateTeacherByID(req.body.id, req.body.name, req.body.secName, req.body.idcard, req.body.email, req.session.usernameData[0].ID_USER, req.body.stat) !== false) {
                response.data = "El Profesor fue Actualizado correctamente";
                response.code = "200";
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
            const controller = new ControllerRol();
            res.send({ "code": "200" });
        });
}

module.exports = user;