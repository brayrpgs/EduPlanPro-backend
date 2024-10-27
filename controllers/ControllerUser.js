const User = require("../data/User");
class ControllerUser {
    constructor(parameters) {
        this.userdata = new User();
    }
    //autentificacion
    async auth(param1, param2) {
        return await this.userdata.validateUser(param1, param2);
    }

    async insertUser(name, secName, idcard, idUser, idRol, pass) {
        return await this.userdata.insert(name, secName, idcard, idUser, idRol, pass);
    }


}

module.exports = ControllerUser;