const ControllerUsers = require("../controllers/ControllerUser");
const session = (app) => {
    let response = {
        "message": "message",
        "code": "code"
    };
    app.route("/session")
        .post(async (req, res) => {
            const controller = new ControllerUsers();
            req.session.usernameData = await controller.auth(req.body.idcard, req.body.password);
            if (req.session.usernameData === false) {
                response.code = "400";
                response.message = "Lo sentimos intentelo de nuevo";
                res.json(response);
            }
            else {
                response.code = "200";
                response.message = "Sesión iniciada y username asignado";
                res.json(response);
            }
        })
        .get((req, res) => {
            if (req.session.usernameData) {
                response.message = {
                    "Greeting": `Bienvenido(a), ${req.session.usernameData[0].DSC_NAME}`,
                    "user": req.session.usernameData[0]
                }
                response.code = "200";
                res.json(response)
                //res.send(response);
            } else {
                response.message = "Por favor inicia sesión";
                response.code = "400";
                res.send(response);
            }
        })
        .delete((req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    response.message = "Error al cerrar la sesión";
                    response.code = "500";
                    return res.status(500).send(response);
                }
                response.message = "Sesión cerrada";
                response.code = "200";
                res.send(response);
            });
        });
}
module.exports = session
