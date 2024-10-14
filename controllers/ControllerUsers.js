const User = require("../data/User");
class ControllerUsers {
    constructor(parameters) {
        this.userdata = new User();
    }
    //autentificacion
    async auth(param1, param2) {
        return await this.userdata.validateUser(param1, param2);
    }
}

module.exports = ControllerUsers;