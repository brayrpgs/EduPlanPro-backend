
const ControllerRecycleBin = require("../controllers/ControllerRecycleBin");
const validateSession = require("../middlewares/validateSession");

const recyclebin = (app) => {
    const response = {
        "data": "message",
        "code": "code"
    };
    app.route("/recyclebin")
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerRecycleBin();
            response.data = await controller.getOffState(req.query.carrer,
                req.query.school, req.query.faculty, req.query.teacher,
                req.query.study, req.query.course);
            response.code = "200";
            res.send(response);
        });
}
module.exports = recyclebin;