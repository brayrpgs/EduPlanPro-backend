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
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }else if(result === '23505') {
                response.data = "El Usuario Ya Esta Registrado";
                response.code = "500";
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
            const controller = new ControllerUser();
            response.data = await controller.getAllUser();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerUser();
            if (await controller.deleteUserByID(req.body.id) !== false) {
                response.data = "El Usuario fue Eliminado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Usuario No fue eliminado";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerUser();//id, name, secName, idcard, idRol, pass, idUser, stat, flagPass
            if (await controller.updateUserByID(req.body.id, req.body.name, req.body.secName, req.body.idcard, req.body.idrol, req.body.pass, req.session.usernameData[0].ID_USER, req.body.stat, req.body.flagPass) !== false) {
                response.data = "El Usuario fue Actualizado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Usuario No fue Actualizado";
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