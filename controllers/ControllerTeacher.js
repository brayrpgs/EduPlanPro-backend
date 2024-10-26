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

    async updateTeacherByID(id, name, secName, idcard, email, idUser, stat) {
        return await this.teacher.updateById(id, name, secName, idcard, email, idUser, stat);
    }


}

module.exports = ControllerTeacher;