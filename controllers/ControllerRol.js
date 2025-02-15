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

    async updateRolByID(DSC_NAME, DSC_DESCRIPTION, UPDATED_BY, STATE, ID_ROL) {
        return await this.rol.updateById(DSC_NAME, DSC_DESCRIPTION, UPDATED_BY, STATE, ID_ROL);
    }


}

module.exports = ControllerRol;