const ControllerStudyPlan = require("../controllers/ControllerStudyPlan");
const validateSession = require("../middlewares/validateSession");

const studyPlan = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };

    app.route("/studyPlan")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerStudyPlan();//DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL
            const result = await controller.insertStudyPlan(req.body.DSC_NAME, req.body.DAT_INIT, req.body.DAT_MAX, req.body.ID_CAREER, req.session.usernameData[0].ID_USER, req.body.PDF_URL)
            if (result === true) {
                response.data = "El Plan de estudios fue creado correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "El Plan de estudios ya Existe";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }
            else {
                response.data = "El Plan de estudios No fue creado";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerStudyPlan();
            response.data = await controller.getAllStudyPlan();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerStudyPlan();
            if (await controller.deleteStudyPlanByID(req.body.id) !== false) {
                response.data = "El Plan de estudios fue Eliminado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Plan de estudios No fue eliminado";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerStudyPlan();
            const result = await controller.updateStudyPlanByID(req.body.DSC_NAME, req.body.DAT_INIT, req.body.DAT_MAX, req.body.ID_CAREER, req.session.usernameData[0].ID_USER, req.body.PDF_URL, req.body.STATE, req.body.ID_STUDY_PLAN);
            if (result) {
                response.data = "El Plan de estudios fue Actualizado correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "El Plan de estudios No fue Actualizado";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerStudyPlan();
            res.send({ "code": "200" });
        });
}

module.exports = studyPlan;