const Controller = require("../controllers/ControllerStudyPlan");
const validateSession = require("../middlewares/validateSession");

const compressedFiles = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/CompressedFiles")
        .get(async (req, res) => {
        })
       
}

module.exports = studyPlan;