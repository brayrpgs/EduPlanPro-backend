
const ControllerPreferences = require("../controllers/ControllerPreferences");
const validateSession = require("../middlewares/validateSession");

const preferences = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/preferences")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPreferences();//, 
            const result = await controller.insertPreferences(req.session.usernameData[0].ID_USER,
                req.body.PREFERENCES);
            if (result === true) {
                response.data = "Las preferencias fueron creadas correctamente";
                response.code = "200";
                res.send(response);
            } else {
                response.data = "La carrera No fue creada";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPreferences();
            response.data = await controller.getAllPreferences();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPreferences();
            if (await controller.deletepreferencesByID(req.body.id) !== false) {
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
            const controller = new ControllerPreferences();
            if (await controller.updatepreferencesByID(req.body.DSC_CARRER, req.body.DSC_CODE, req.body.ID_SCHOOL, req.session.usernameData[0].ID_USER, req.body.STATE, req.body.ID_CAREER) !== false) {
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
            const controller = new ControllerPreferences();
            res.send({ "code": "200" });
        });
}
module.exports = preferences;