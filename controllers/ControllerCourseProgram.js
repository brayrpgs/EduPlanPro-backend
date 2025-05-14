const CourseProgram = require("../data/CourseProgram");

class ControllerCourseProgram {
    constructor(parameters) {
        this.CourseProgram = new CourseProgram();
    }
    async insertCourseProgram(DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL) {
        return await this.CourseProgram.insert(DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL);
    }

    async getAllCourseProgram() {
        return await this.CourseProgram.getAll();
    }

    async deleteCourseProgramByID(id) {
        return await this.CourseProgram.deleteById(id);
    }

    async updateCourseProgramByID(DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL, STATE, ID_COURSE_PROGRAM) {
        return await this.CourseProgram.updateById(DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL, STATE, ID_COURSE_PROGRAM);
    }

    async getAllCourseProgramEliminated() {
        return await this.CourseProgram.getAllEliminated();
    }
}

module.exports = ControllerCourseProgram;