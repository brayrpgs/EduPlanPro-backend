const ControllerSearchStudyPlan = require("../controllers/ControllerSearchStudyPlan");
const validateSession = require("../middlewares/validateSession");
/**
 * 
 * @param {Express.Application} app 
 */
const searchstudyplan = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/searchstudyplan")
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            if (req.query.name === "search") {
                const controller = new ControllerSearchStudyPlan();
                response.code = "200";
                response.data = await controller.search(req.query.data, req.query.data2, req.query.data3, req.query.data4);
                res.send(response);
            }
            else if (req.query.name === "search-page") {
                const controller = new ControllerSearchStudyPlan();
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
                response.data = await controller.getPageBySearch(sizePage, offset, req.query.data, req.query.data2, req.query.data3, req.query.data4);
                res.send(response);
            }
            else if (req.query.name === "info-page") {
                const controller = new ControllerSearchStudyPlan();
                response.code = "200";
                response.data = await controller.getPageInfo();
                res.send(response);
            }
            else if (req.query.name === "filter-update") {
                const controller = new ControllerSearchStudyPlan();
                response.code = "200";
                response.data = await controller.searchUpdateAt(req.query.date1, req.query.date2);
                res.send(response);
            }
            else if (req.query.name === "filter-create") {
                const controller = new ControllerSearchStudyPlan();
                response.code = "200";
                response.data = await controller.searchCreatedAt(req.query.date1, req.query.date2);
                res.send(response);
            }
            else if (req.query.name === "filter-state") {
                const controller = new ControllerSearchStudyPlan();
                response.code = "200";
                response.data = await controller.searchState(req.query.stat);
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
                const controller = new ControllerSearchStudyPlan();
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
module.exports = searchstudyplan;