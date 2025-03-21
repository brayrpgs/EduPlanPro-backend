const Reports = require("../data/Reports");

class ControllerReports {
    constructor(parameters) {
        this.Reports = new Reports()
    }
    async getPageBySearch(params) {
        return await this.Reports.getPageBySearch(params);
    }
}

module.exports = ControllerReports;