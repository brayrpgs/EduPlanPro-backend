const ControllerSearchFaculty = require("../controllers/ControllerSearchFaculty");
const validateSession = require("../middlewares/validateSession");
/**
 * 
 * @param {Express.Application} app 
 */
const searchfaculty = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/searchfaculty")
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            if (req.query.name === "search") {
                const controller = new ControllerSearchFaculty();
                response.code = "200";
                response.data = await controller.search(req.query.data);
                res.send(response);
            }
            else if (req.query.name === "search-page") {
                const controller = new ControllerSearchFaculty();
                const numPage = req.query.numPage;//enviar siempre el 0 
                const sizePage = 8;
                const offset = (sizePage * numPage) - sizePage;
                if (offset < 0) {
                    response.data = "Seleccione un Tamaño de Datos Apropiado";
                    response.code = "400";
                    res.send(response);
                    return;
                }
                response.code = "200";
                console.log(sizePage,offset,req.query.search)
                response.data = await controller.getPageBySearch(sizePage, offset, req.query.search);
                res.send(response);
            }
            else if (req.query.name === "filter-update") {
                const controller = new ControllerSearchFaculty();
                response.code = "200";
                response.data = await controller.searchUpdateAt(req.query.date1, req.query.date2);
                res.send(response);
            }
            else if (req.query.name === "filter-create") {
                const controller = new ControllerSearchFaculty();
                response.code = "200";
                response.data = await controller.searchCreatedAt(req.query.date1, req.query.date2);
                res.send(response);
            }
            else if (req.query.name === "filter-state") {
                const controller = new ControllerSearchFaculty();
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
                const controller = new ControllerSearchFaculty();
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
module.exports = searchfaculty;