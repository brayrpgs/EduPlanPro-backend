const validateSession = require("../middlewares/validateSession");

const forgotPassword = (app) => {
  let response = {
    data: "message",
    code: "code",
  };

  app.route("/forgotpassword").post((async (req, res) => {
    if (!(await validateSession(req, res, response))) return;

    // Validar que los datos vengan correctos
    if(req.body.question1 === "" || req.body.question2 === "" || req.body.question3 === ""){
        response.code = "400";
        response.message = "Los datos no se enviaron correctamente";
        res.send(response);
        return;
    }
    
    response.code = "200";
    response.message = "Datos recibidos correctamente";
    res.send(response);
  }));
};

module.exports = forgotPassword;
