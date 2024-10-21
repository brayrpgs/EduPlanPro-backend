const ControllerFaculty = require("../controllers/ControllerFaculty");
const validateSession = require("../middlewares/validateSession");

const faculty = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/faculty")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFaculty();
            if (await controller.insertFaculty(req.body.name, req.session.usernameData[0].ID_USER) !== false) {
                response.data = "La facultad fue creada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La facultad No fue creada";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFaculty();
            response.data = await controller.getAllFaculty();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFaculty();
            if (await controller.deleteFacultyByID(req.body.id) !== false) {
                response.data = "La facultad fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La facultad No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFaculty();
            if (await controller.updateFacultyByID(req.body.desc, req.session.usernameData[0].ID_USER, req.body.stat, req.body.id) !== false) {
                response.data = "La facultad fue Actualizada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La facultad No fue Actualizada";
                response.code = "400";
                res.send(response);
            }
        })
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFaculty();
            if (await controller.deleteFacultyByID(req.body.id) !== false) {
                response.data = "La facultad fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La facultad No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        });
}
module.exports = faculty;