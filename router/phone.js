
const ControllerPhone = require("../controllers/ControllerPhone");
const validateSession = require("../middlewares/validateSession");

const phone = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/phone")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPhone();
            const result = await controller.insertPhone(req.body.NUM_PHONE_NUMBER, req.session.usernameData[0].ID_USER);
            if (result === true) {
                response.data = "El telefono fue creada correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "El telefono Ya Esta Registrado";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }
            else {
                response.data = "El telefono No fue creado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPhone();
            response.data = await controller.getAllPhone();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPhone();
            if (await controller.deletePhoneByID(req.body.ID_PHONE) !== false) {
                response.data = "El telefono fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El telefono No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPhone();//NUM_PHONE_NUMBER, UPDATE_BY, STATE, ID_PHONE
            if (await controller.updatePhoneByID(req.body.NUM_PHONE_NUMBER, req.session.usernameData[0].ID_USER, req.body.STATE, req.body.ID_PHONE) !== false) {
                response.data = "El telefono fue Actualizada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El telefono No fue Actualizada";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPhone();
            res.send({ "code": "200" });
        });
}
module.exports = phone;