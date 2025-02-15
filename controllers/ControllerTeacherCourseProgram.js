const TeacherCourse = require("../data/TeacherCourse");

class ControllerTeacherCourseProgram {
    constructor(parameters) {
        this.TeacherCourse = new TeacherCourse();
    }
    async insertTeacherCourse(ID_TEACHER, ID_COURSE_PROGRAM) {
        return await this.TeacherCourse.insert(ID_TEACHER, ID_COURSE_PROGRAM);
    }

    async getAllTeacherCourse() {
        return await this.TeacherCourse.getAll();
    }

    async deleteTeacherCourseByID(id) {
        return await this.TeacherCourse.deleteById(id);
    }

    async updateTeacherCourseByID(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY, STATE, ID_CAREER) {
        return await this.TeacherCourse.updateById(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY, STATE, ID_CAREER);
    }


}

module.exports = ControllerTeacherCourseProgram;