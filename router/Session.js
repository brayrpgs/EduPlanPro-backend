const ControllerUsers = require("../controllers/ControllerUser");

const session = (app) => {
    app.route("/session")
        .post(async (req, res) => {
            const controller = new ControllerUsers();
            const result = await controller.auth(req.body.idcard, req.body.password);
            let response = {};

            if (!result || result === false) {
                response.code = "400";
                response.message = "Lo sentimos, inténtelo de nuevo";
                return res.json(response);
            }

            // Guarda los datos en sesión
            req.session.usernameData = result;

            response.code = "200";
            response.message = "Sesión iniciada";
            res.json(response);
        })

        .get((req, res) => {
            let response = {};

            if (req.session.usernameData) {
                response.code = "200";
                response.message = `Bienvenido(a), ${req.session.usernameData[0].DSC_NAME}`;
                response.data = {
                    ID_USER: req.session.usernameData[0].ID_USER
                };
            } else {
                response.code = "400";
                response.message = "Por favor inicia sesión";
                response.data = null;
            }

            res.json(response);
        })

        .delete((req, res) => {
            let response = {};
            req.session.destroy((err) => {
                if (err) {
                    response.message = "Error al cerrar la sesión";
                    response.code = "500";
                    return res.status(500).json(response);
                }
                response.message = "Sesión cerrada";
                response.code = "200";
                res.json(response);
            });
        });
};

module.exports = session;
