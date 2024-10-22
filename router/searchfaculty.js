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
            else if (req.query.name === "filter-update") {
                console.debug("filter-update");
            }
            else if (req.query.name === "filter-create") {
                console.debug("filter-create");
            }
            else if (req.query.name === "filter-state") {
                console.debug("filter-state");
            }
            else {
                res.send(req.query);
            }
        });
}
module.exports = searchfaculty;