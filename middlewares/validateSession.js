
const validateSession = async (req, res, response) => {
    /**
     * valida las sessiones del usuario
     */
    if (req.session.usernameData === undefined) {
        response.code = "400";
        response.data = "Por favor inicia sesión";
        res.send(response);
        return false;
    }
    else {
        return true;
    }

};
module.exports = validateSession;


