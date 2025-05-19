const ControllerSearchTeacher = require("../controllers/ControllerSearchTeacher");
const validateSession = require("../middlewares/validateSession");
/**
 * @param {Express.Application} app 
 */
const searchteacher = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/searchteacher")
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            if (req.query.name === "search-page") {
                const controller = new ControllerSearchTeacher();
                const numPage = req.query.numPage;
                const sizePage = 8;
                const offset = (sizePage * numPage) - sizePage;
                if (offset < 0) {
                    response.data = "Seleccione un Tamaño de Datos Apropiado";
                    response.code = "400";
                    res.send(response);
                    return;
                }
                response.code = "200";
                response.data = await controller.getPageBySearch(sizePage, offset, req.query.nameTeach, req.query.secName, req.query.idCard, req.query.email);
                res.send(response);
            }
            else if (req.query.name === "info-page") {
                const controller = new ControllerSearchTeacher();
                response.code = "200";
                response.data = await controller.getPageInfo(pageSize = 8);
                res.send(response);
            }
            else if (req.query.name === "filter-state") {
                const controller = new ControllerSearchTeacher();
                response.code = "200";
                response.data = await controller.getByState(req.query.stat);
                res.send(response);
            }
            else {
                response.code = "400";
                response.data = "Parametros de busqueda incorrecto";
                res.send(response);
            }
        })
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            if (req.body.id) {
                const controller = new ControllerSearchTeacher();
                response.code = "200";
                response.data = await controller.searchId(req.body.id);
                res.send(response);
            }
            else {
                response.code = "400";
                response.data = "Parametros de busqueda incorrecto";
                res.send(response);
            }
        });
}
module.exports = searchteacher;