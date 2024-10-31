const ControllerPageFaculty = require("../controllers/ControllerPageFaculty");
const validateSession = require("../middlewares/validateSession");

const pagefaculty = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/pagefaculty")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPageFaculty();
            const numPage = req.body.numPage;
            const sizePage = req.body.sizePage;
            const offset = (sizePage * numPage) - sizePage;
            const result = await controller.getPage(sizePage, offset);
            if (result !== false) {
                response.data = result;
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "Seleccione un Tamaño de Datos Apropiado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerPageFaculty();
            if (req.query.size == 0) {
                response.data = "Seleccione un Tamaño de Datos Apropiado";
                response.code = "400";
                res.send(response);
                return;
            }
            const result = await controller.getPageInfo(req.query.size);
            if (result !== false) {
                response.data = result;
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "Seleccione un Tamaño de Datos Apropiado";
                response.code = "400";
                res.send(response);
            }
        })
}
module.exports = pagefaculty;