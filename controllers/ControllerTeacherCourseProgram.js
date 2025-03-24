const TeacherCourseProgram = require("../data/TeacherCourseProgram");

class ControllerTeacherCourseProgramProgram {
    constructor(parameters) {
        this.TeacherCourseProgram = new TeacherCourseProgram();
    }
    async insertTeacherCourseProgram(ID_TEACHER, ID_COURSE_PROGRAM) {
        return await this.TeacherCourseProgram.insert(ID_TEACHER, ID_COURSE_PROGRAM);
    }

    async getAllTeacherCourseProgram() {
        return await this.TeacherCourseProgram.getAll();
    }

    async deleteTeacherCourseProgramByID(id) {
        return await this.TeacherCourseProgram.deleteById(id);
    }
}

module.exports = ControllerTeacherCourseProgramProgram;