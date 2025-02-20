const ControllerSchoolPhone = require("../controllers/ControllerSchoolPhone");
const validateSession = require("../middlewares/validateSession");

const schoolphone = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/schoolphone")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchoolPhone();
            const result = await controller.insertSchoolPhone(req.body.ID_SCHOOL, req.body.ID_PHONE);
            if (result === true) {
                response.data = "El Numero de la escuela fue creado correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "El Numero de la escuela Ya Esta Registrado";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }
            else {
                response.data = "El Numero de la escuela No fue creado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchoolPhone();
            response.data = await controller.getAllSchoolPhone();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchoolPhone();
            if (await controller.deleteSchoolPhoneByID(req.body.id) !== false) {
                response.data = "La Numero de la escuela fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La Numero de la escuela No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchoolPhone();//ID_FACULTY, ID_PHONE, id
            if (await controller.updateSchoolPhoneByID(req.body.ID_SCHOOL, req.body.ID_PHONE, req.body.id)) {
                response.data = "La Numero de la escuela fue Actualizada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La Numero de la escuela No fue Actualizada";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchoolPhone();
            res.send({ "code": "200" });
        });
}
module.exports = schoolphone;