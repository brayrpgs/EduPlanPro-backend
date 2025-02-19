const FacultyPhone = require("../data/FacultyPhone");

class ControllerFacultyPhonePhone {
    constructor(parameters) {
        this.FacultyPhone = new FacultyPhone();
    }
    async insertFacultyPhone(ID_FACULTY, ID_PHONE) {
        return await this.FacultyPhone.insert(ID_FACULTY, ID_PHONE);
    }

    async getAllFacultyPhone() {
        return await this.FacultyPhone.getAll();
    }

    async deleteFacultyPhoneByID(id) {
        return await this.FacultyPhone.deleteById(id);
    }

    async updateFacultyPhoneByID(ID_FACULTY, ID_PHONE, id) {
        return await this.FacultyPhone.updateById(ID_FACULTY, ID_PHONE, id);
    }


}

module.exports = ControllerFacultyPhonePhone;