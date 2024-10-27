const Rol = require("../data/Rol");

class ControllerRol {
    constructor(parameters) {
        this.rol = new Rol();
    }
    async insertRol(name, desc, idUser) {
        return await this.rol.insert(name, desc, idUser);
    }

    async getAllRol() {
        return await this.rol.getAll();
    }

    async deleteRolByID(id) {
        return await this.rol.deleteById(id);
    }

    async updateRolByID(desc, user, stat, id) {
        return await this.rol.updateById(desc, user, stat, id);
    }


}

module.exports = ControllerRol;