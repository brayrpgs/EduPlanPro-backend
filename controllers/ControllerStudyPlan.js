const StudyPlan = require("../data/StudyPlan");


class ControllerStudyPlan {
    constructor(parameters) {
        this.StudyPlan = new StudyPlan();
    }
    async insertStudyPlan(DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL) {
        return await this.StudyPlan.insert(DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL);
    }

    async getAllStudyPlan() {
        return await this.StudyPlan.getAll();
    }

    async deleteStudyPlanByID(id) {
        return await this.StudyPlan.deleteById(id);
    }

    async updateStudyPlanByID(DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL, STATE, ID_STUDY_PLAN) {
        return await this.StudyPlan.updateById(DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL, STATE, ID_STUDY_PLAN);
    }


}

module.exports = ControllerStudyPlan;