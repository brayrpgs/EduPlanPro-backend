const ControllerUsers = require("../controllers/ControllerUsers");


const session = (app) => {
    app.route("/session")
        // Ruta para iniciar la sesión y asignar una variable de sesión
        .post(async (req, res) => {
            const controller = new ControllerUsers();
            req.session.usernameData = await controller.auth(req.body.idcard, req.body.password);
            const response = {
                "data": "Sesión iniciada y username asignado",
                "code": "200"
            };
            res.json(response);
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
