const Faculty = require("../data/Faculty");

class ControllerFaculty {
    constructor(parameters) {
        this.faculty = new Faculty();
    }
    async insertFaculty(name, user) {
        return await this.faculty.insert(name, user);
    }

    async getAllFaculty() {
        return await this.faculty.getAll();
    }

    async deleteFacultyByID(id) {
        return await this.faculty.deleteById(id);
    }

    async updateFacultyByID(desc, user, stat, id) {
        return await this.faculty.updateById(desc, user, stat, id);
    }


}

module.exports = ControllerFaculty;