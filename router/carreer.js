
const ControllerCarreer = require("../controllers/ControllerCarreer");
const validateSession = require("../middlewares/validateSession");

const carreer = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/carreer")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCarreer();
            const result = await controller.insertCarreer(req.body.DSC_CARRER,
                req.body.DSC_CODE, req.body.ID_SCHOOL, req.session.usernameData[0].ID_USER);
            if (result === true) {
                response.data = "La carrera fue creada correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "La carrera Ya Esta Registrada";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }
            else {
                response.data = "La carrera No fue creada";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCarreer();
            response.data = await controller.getAllCarreer();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCarreer();
            if (await controller.deleteCarreerByID(req.body.id) !== false) {
                response.data = "La carrera fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La carrera No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCarreer();
            if (await controller.updateCarreerByID(req.body.DSC_CARRER, req.body.DSC_CODE, req.body.ID_SCHOOL, req.session.usernameData[0].ID_USER, req.body.STATE, req.body.ID_CAREER) !== false) {
                response.data = "La carrera fue Actualizada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La carrera No fue Actualizada";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerCarreer();
            res.send({ "code": "200" });
        });
}
module.exports = carreer;