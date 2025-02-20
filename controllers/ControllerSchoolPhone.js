const SchoolPhone = require("../data/SchoolPhone");

class ControllerSchoolPhone {
    constructor(parameters) {
        this.SchoolPhone = new SchoolPhone();
    }
    async insertSchoolPhone(ID_SCHOOL, ID_PHONE) {
        return await this.SchoolPhone.insert(ID_SCHOOL, ID_PHONE);
    }

    async getAllSchoolPhone() {
        return await this.SchoolPhone.getAll();
    }

    async deleteSchoolPhoneByID(id) {
        return await this.SchoolPhone.deleteById(id);
    }

    async updateSchoolPhoneByID(ID_SCHOOL, ID_PHONE, id) {
        return await this.SchoolPhone.updateById(ID_SCHOOL, ID_PHONE, id);
    }


}

module.exports = ControllerSchoolPhone;