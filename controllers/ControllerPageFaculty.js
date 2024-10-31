const PageFaculty = require("../data/PageFaculty");

class ControllerPageFaculty {
    constructor(parameters) {
        this.pageFaculty = new PageFaculty();
    }

    async getPageInfo(pageSize) {
        return await this.pageFaculty.getPageInfo(pageSize);
    }

    async getPage(limit, offset) {
        return await this.pageFaculty.getPage(limit, offset);
    }
}

module.exports = ControllerPageFaculty;