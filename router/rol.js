const ControllerRol = require("../controllers/ControllerRol");
const validateSession = require("../middlewares/validateSession");

const rol = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/rol")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerRol();
            const result = await controller.insertRol(new String(req.body.name).toUpperCase(), req.body.desc, req.session.usernameData[0].ID_USER);
            if (result == 23505) {
                response.data = "El Rol No fue creado, porque ya existe uno con ese nombre";
                response.code = "500";
                res.send(response);
            }
            else if (result === true) {
                response.data = "El Rol fue creado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Rol No fue creado";
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
module.exports = rol;