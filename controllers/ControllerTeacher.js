const Teacher = require("../data/Teacher");


class ControllerTeacher {
    constructor(parameters) {
        this.teacher = new Teacher();
    }
    async insertTeacher(name, secName, idcard, idUser, email) {
        return await this.teacher.insert(name, secName, idcard, idUser, email);
    }

    async getAllTeacher() {
        return await this.teacher.getAll();
    }

    async deleteTeacherByID(id) {
        return await this.teacher.deleteById(id);
    }

    async updateTeacherByID(desc, user, stat, id) {
        return await this.teacher.updateById(desc, user, stat, id);
    }


}

module.exports = ControllerTeacher;