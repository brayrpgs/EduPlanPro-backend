const SearchCourseProgram = require("../data/SearchCourseProgram");

class ControllerSearchCourseProgram {
    constructor(parameters) {
        this.SearchCourseProgram = new SearchCourseProgram();
    }
    async search(DSC_NAME, DAT_YEAR, NRC, CICLE, NUM_CREDITS, SIGNATURE) {
        return await this.SearchCourseProgram.search(DSC_NAME, DAT_YEAR, NRC, CICLE, NUM_CREDITS, SIGNATURE);
    }
    async searchUpdateAt(date1, date2) {
        return await this.SearchCourseProgram.searchUpdateAt(date1, date2);
    }
    async searchCreatedAt(date1, date2) {
        return await this.SearchCourseProgram.searchCreatedAt(date1, date2);
    }
    async searchState(state) {
        return await this.SearchCourseProgram.searchState(state);
    }
    async searchId(id) {
        return await this.SearchCourseProgram.searchId(id);
    }
    async getPageBySearch(limit, offset, DSC_NAME, DAT_YEAR, NRC, CICLE, NUM_CREDITS, SIGNATURE) {
        return await this.SearchCourseProgram.getPageBySearch(limit, offset, DSC_NAME, DAT_YEAR, NRC, CICLE, NUM_CREDITS, SIGNATURE);
    }
    async getPageInfo(pageSize = 8) {
        return await this.SearchCourseProgram.getPageInfo(pageSize = 8);
    }


}

module.exports = ControllerSearchCourseProgram;