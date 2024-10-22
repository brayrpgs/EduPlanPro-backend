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
               
            }
            else if(req.query.name === "filter-") {
                console.debug("no hay nada");
            }
            res.send(req.query);
        });
}
module.exports = searchfaculty;