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

    async getAllUser() {
        return await this.userdata.getAll();
    }

    async deleteUserByID(id) {
        return await this.userdata.deleteById(id);
    }

    async updateUserByID(id, name, secName, idcard, email, idUser, stat) {
        return await this.userdata.updateById(id, name, secName, idcard, email, idUser, stat);
    }

}

module.exports = ControllerUser;