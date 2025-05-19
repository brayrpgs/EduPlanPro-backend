const School = require("../data/School");

class ControllerSchool {
    constructor(parameters) {
        this.school = new School;
    }
    async insertSchool(desc, id, user) {
        return await this.school.insert(desc, id, user);
    }

    async getAllSchool() {
        return await this.school.getAll();
    }

    async deleteschoolByID(id) {
        return await this.school.deleteById(id);
    }

    async updateschoolByID(desc, faculty, user, stat, id) {
        return await this.school.updateById(desc, faculty, user, stat, id);
    }

    async getAllSchoolEliminated() {
        return await this.school.getAllEliminated();
    }

}

module.exports = ControllerSchool;