const ControllerUsers = require("../controllers/ControllerUsers");
const session = (app) => {
    let response = {
        "message": "message",
        "code": "code"
    };
    app.route("/session")
        // Ruta para iniciar la sesión y asignar una variable de sesión
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
        //optener datos que sean valiosos en el proceso de inicio de sesion
        .get((req, res) => {
            if (req.session.usernameData) {
                res.send(`Bienvenida, ${req.session.usernameData.DSC_NAME}`);
            } else {
                res.send('Por favor inicia sesión');
            }
        })
        //para cerrar la session
        .delete((req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).send('Error al cerrar la sesión');
                }
                res.send('Sesión cerrada');
            });
        });
}
module.exports = session
