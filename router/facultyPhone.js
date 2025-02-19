const ControllerFacultyPhone = require("../controllers/ControllerFacultyPhone");
const validateSession = require("../middlewares/validateSession");

const facultyphone = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/facultyphone")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFacultyPhone();
            const result = await controller.insertFacultyPhone(req.body.ID_FACULTY, req.body.ID_PHONE);
            if (result === true) {
                response.data = "El Numero de la facultad fue crado correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "El Numero de la facultad Ya Esta Registrado";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }
            else {
                response.data = "El Numero de la facultad No fue creado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFacultyPhone();
            response.data = await controller.getAllFacultyPhone();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFacultyPhone();
            if (await controller.deleteFacultyPhoneByID(req.body.id) !== false) {
                response.data = "La Numero de la facultad fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La Numero de la facultad No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFacultyPhone();//ID_FACULTY, ID_PHONE, id
            if (await controller.updateFacultyPhoneByID(req.body.ID_FACULTY, req.body.ID_PHONE, req.body.id)) {
                response.data = "La Numero de la facultad fue Actualizada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La Numero de la facultad No fue Actualizada";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFacultyPhone();
            res.send({ "code": "200" });
        });
}
module.exports = facultyphone;