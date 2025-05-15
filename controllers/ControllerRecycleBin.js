const RecycleBin = require("../data/RecycleBin");


class ControllerRecycleBin {
    constructor(parameters) {
        this.RecycleBin = new RecycleBin()
    }

    async getOffState(carrerState, schoolState, facultyState, teacherState, studyState, courseState) {
        return await this.RecycleBin.getOffState(carrerState, schoolState, facultyState, teacherState, studyState, courseState);
    }
}

module.exports = ControllerRecycleBin;