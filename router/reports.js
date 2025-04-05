const ControllerReports = require("../controllers/ControllerReports");
const validateSession = require("../middlewares/validateSession");
/**
 * 
 * @param {Express.Application} app 
 */
const reports = (app) => {

    let response = {
        "data": "message",
        "code": "code"
    };


    app.route("/reports")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            if (req.body.params.length !== 14) {
                response.code = 400;
                response.data = "parametros de busqueda incompletos";
                res.send(response);
            }
            if (!req.body.page) {
                response.code = 401;
                response.data = "pagina de busqueda no se encontro";
                res.send(response);
            }

            //normalizar
            for (let index = 0; index < req.body.params.length; index++) {
                if (index === 3 || index === 4) {
                    continue;
                }
                req.body.params[index] = `${req.body.params[index]}%`;
            }
            req.body.params.push(8);
            req.body.params.push((req.body.page * 8) - 8);


            //enviar
            const controller = new ControllerReports();
            const result = await controller.getPageBySearch(req.body.params);
            if (result) {
                response.code = "200";
                response.data = result;
                res.send(response);
            }
            else {
                response.code = "500";
                response.data = "lo sentimos ocurrio un problema en la busqueda";
                res.send(response);
            }

        });
}
module.exports = reports;