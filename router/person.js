const ControllerPerson = require("../controllers/ControllerPerson");

const person = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/person")
        // creacion de usuarios
        .post(async (req, res) => {
            const controller = new ControllerPerson();
            if (await controller.insert(req.body.name, req.body.secondName, req.body.idcard, req.body.updatedBy) !== false) {
                response.data = "La persona fue creada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La persona No fue creada";
                response.code = "400";
                res.send(response);
            }
        })
        //optener todos los usuarios
        .get(async (req, res) => {
            const controller = new ControllerPerson();
            res.send(await controller.getAll());
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

module.exports = person;