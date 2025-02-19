const SearchStudyPlan = require("../data/SearchStudyPlan");

class ControllerSearchStudyPlan {
    constructor(parameters) {
        this.SearchStudyPlan = new SearchStudyPlan();
    }
    async search(DSC_NAME, DAT_INIT, DAT_MAX, DSC_CARRER) {
        return await this.SearchStudyPlan.search(DSC_NAME, DAT_INIT, DAT_MAX, DSC_CARRER);
    }
    async searchUpdateAt(date1, date2) {
        return await this.SearchStudyPlan.searchUpdateAt(date1, date2);
    }
    async searchCreatedAt(date1, date2) {
        return await this.SearchStudyPlan.searchCreatedAt(date1, date2);
    }
    async searchState(state) {
        return await this.SearchStudyPlan.searchState(state);
    }
    async searchId(id) {
        return await this.SearchStudyPlan.searchId(id);
    }
    async getPageBySearch(limit, offset, DSC_NAME, DAT_INIT, DAT_MAX, DSC_CARRER) {
        return await this.SearchStudyPlan.getPageBySearch(limit, offset, DSC_NAME, DAT_INIT, DAT_MAX, DSC_CARRER);
    }
    async getPageInfo(pageSize = 8) {
        return await this.SearchStudyPlan.getPageInfo(pageSize = 8);
    }
}
module.exports = ControllerSearchStudyPlan;