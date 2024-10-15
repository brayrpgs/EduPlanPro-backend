const ControllerUsers = require("../controllers/ControllerUsers");

// Ruta para iniciar la sesión y asignar una variable de sesión
const session = (app) => {
    app.post('/login', async (req, res) => {
        const controller = new ControllerUsers();
        req.session.usernameData = await controller.auth(req.body.idcard, req.body.password);
        const response = {
            "data": "Sesión iniciada y username asignado",
            "code": "200"
        };
        res.json(response);
    });

    // Ruta para acceder a la variable de sesión
    app.get('/dashboard', (req, res) => {
        if (req.session.usernameData) {
            res.send(`Bienvenida, ${req.session.usernameData.DSC_NAME}`);
        } else {
            res.send('Por favor inicia sesión');
        }
    });

    // Ruta para cerrar la sesión
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error al cerrar la sesión');
            }
            res.send('Sesión cerrada');
        });
    });
}

module.exports = session
