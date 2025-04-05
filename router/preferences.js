
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
            response.data = await controller.getAllPreferences(req.session.usernameData[0].ID_USER);
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPreferences();
            if (await controller.deletePreferencesByID(req.session.usernameData[0].ID_USER)) {
                response.data = "Las preferencias fueron eliminadas correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "Las preferencias No fueron eliminadas";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPreferences();
            if (await controller.updatePreferencesByID(req.session.usernameData[0].ID_USER,
                req.body.PREFERENCES)) {
                response.data = "Las preferencias fueron actualizadas correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "Las preferencias No fueron actualizadas";
                response.code = "400";
                res.send(response);
            }
        });
}
module.exports = preferences;