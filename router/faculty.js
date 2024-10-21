const ControllerFaculty = require("../controllers/ControllerFaculty");
const validateSession = require("../middlewares/validateSession");

const faculty = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/faculty")
        // creacion de usuarios
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFaculty();
            if (await controller.insertFaculty(req.body.name,req.session.usernameData[0].ID_USER) !== false) {
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
        //optener todos los usuarios
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerFaculty();
            response.data = await controller.getAllFaculty();
            response.code = "200";
            res.send(response);
        })
        //hay que cambiar
        .delete((req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).send('Error al cerrar la sesión');
                }
                res.send('Sesión cerrada');
            });
        });
}

module.exports = faculty;