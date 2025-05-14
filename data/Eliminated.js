const ControllerCarreer = require("../controllers/ControllerCarreer");
const ControllerCourseProgram = require("../controllers/ControllerCourseProgram");
const ControllerFaculty = require("../controllers/ControllerFaculty");
const ControllerSchool = require("../controllers/ControllerSchool");
const ControllerStudyPlan = require("../controllers/ControllerStudyPlan");
const ControllerTeacher = require("../controllers/ControllerTeacher");
const ControllerUser = require("../controllers/ControllerUser");
const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class Eliminated {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }

    async getAllEliminatedFiles() {
        const eliminatedCareers = await new ControllerCarreer().getAllCareerEliminated();
        const eliminatedFaculties = await new ControllerFaculty().getAllFacultyEliminated();
        const eliminatedSchools = await new ControllerSchool().getAllSchoolEliminated();
        const eliminatedTeachers = await new ControllerTeacher().getAllTeacherEliminated();
        const eliminatedStudyPlans = await new ControllerStudyPlan().getAllStudyPlanEliminated();
        const eliminatedProgramCourses = await new ControllerCourseProgram().getAllCourseProgramEliminated();
        const eliminatedUsers = await new ControllerUser().getAllUserEliminated();

        const data = {
            "Careers": eliminatedCareers,
            "Faculties": eliminatedFaculties,
            "Schools": eliminatedSchools,
            "Teachers": eliminatedTeachers,
            "StudyPlans": eliminatedStudyPlans,
            "ProgramCourses": eliminatedProgramCourses,
            "Users": eliminatedUsers
        };
        const result = JSON.stringify(data, null, 2);

        return result;
    }
}

module.exports = Eliminated;