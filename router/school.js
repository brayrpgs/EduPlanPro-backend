const ControllerSchool = require("../controllers/ControllerSchool");
const validateSession = require("../middlewares/validateSession");
const school = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/school")
        .post(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchool();
            const result = await controller.insertSchool(req.body.desc, req.body.id, req.session.usernameData[0].ID_USER)
            console.log(result);
            if (result === true) {
                response.data = "La Escuela fue creada correctamente";
                response.code = "200";
                res.send(response);
            }
            else if (result === '23505') {
                response.data = "La Escuela Ya Esta Registrada";
                response.code = "500";
                res.send(response);
            }
            else if (result === undefined) {
                response.data = "Campos invalidos";
                response.code = "501";
                res.send(response);
            }
            else {
                response.data = "La Escuela No fue creada";
                response.code = "400";
                res.send(response);
            }
        })
        .get(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchool();
            response.data = await controller.getAllSchool();
            response.code = "200";
            res.send(response);
        })
        .delete(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchool();
            if (await controller.deleteschoolByID(req.body.id) !== false) {
                response.data = "La Escuela fue Eliminada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La Escuela No fue eliminada";
                response.code = "400";
                res.send(response);
            }
        })
        .patch(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchool();//desc, faculty, user, stat, id
            if (await controller.updateschoolByID(req.body.desc, req.body.facu, req.session.usernameData[0].ID_USER, req.body.stat, req.body.id) !== false) {
                response.data = "La Escuela fue Actualizada correctamente";
                response.code = "200";
                res.send(response);
            }
            else {
                response.data = "La Escuela No fue Actualizada";
                response.code = "400";
                res.send(response);
            }
        })
        /**
         * falta por implemantar pero no es del todo necesario
         */
        .put(async (req, res) => {
            if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerSchool();
            res.send({ "code": "200" });
        });
}
module.exports = school;