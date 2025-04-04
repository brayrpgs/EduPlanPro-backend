const ControllerForgotPassword = require("../controllers/ControllerForgotPassword");
const validateSession = require("../middlewares/validateSession");

const forgotPassword = (app) => {
  let response = {
    message: "message",
    code: "code",
  };

  app.route("/forgotpassword").post(async (req, res) => {
    if (!(await validateSession(req, res, response))) return;

    const controllerForgotPassword = new ControllerForgotPassword();

    const { question1, question2, question3 } = req.body;

    // Validar que los datos vengan correctos
    if (!question1 || !question2 || !question3) {
      response.code = "400";
      response.message = "Los datos no se enviaron correctamente.";
      res.send(response);
      return;
    }

    const result = await controllerForgotPassword.getUserWithPassword(
      req.body.question1,
      req.body.question2,
      req.body.question3
    );

    if (result.length === 0) {
      response.code = "404";
      response.message =
        "No se puedo verificar el usuario segun las respuestas enviadas.";
      res.send(response);
    } else {
      response.code = "200";
      response.message = result;
      res.send(response);
    }
  });

  app.route("/changepassword").post(async (req, res) => {
    if (!(await validateSession(req, res, response))) return;

    const controllerForgotPassword = new ControllerForgotPassword();

    const user = req.body;
    const {
      newPassword,
      newPasswordConfirmation,
      ID_USER,
    } = user;

    if (!newPassword || !newPasswordConfirmation || !ID_USER) {
      response.code = "400";
      response.message = "Los datos no se enviaron correctamente.";
      res.send(response);
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      response.code = "401";
      response.message = "Las contraseñas no coinciden.";
      res.send(response);
      return;
    }

    const result = await controllerForgotPassword.updatePassword(user);
    if(result){
      response.code = "200";
      response.message = "Contraseña actualizada correctamente.";
      res.send(response);
      return;

    } else {

      response.code = "500";
      response.message = "No se pudo actualizar la contraseña.";
      res.send(response);
      return;
    }
  });
  
};

module.exports = forgotPassword;
