const Carreer = require("../data/Carreer");

class ControllerCarreer {
    constructor(parameters) {
        this.Carreer = new Carreer();
    }
    async insertCarreer(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY) {
        return await this.Carreer.insert(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY);
    }

    async getAllCarreer() {
        return await this.Carreer.getAll();
    }

    async deleteCarreerByID(id) {
        return await this.Carreer.deleteById(id);
    }

    async updateCarreerByID(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY, STATE, ID_CAREER) {
        return await this.Carreer.updateById(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY, STATE, ID_CAREER);
    }


}

module.exports = ControllerCarreer;