const SearchCarreer = require("../data/SearchCarreer");

class ControllerSearchCarreer {
    constructor(parameters) {
        this.SearchCarreer = new SearchCarreer();
    }
    async search(DSC_CARRER, DSC_CODE, DSC_SCHOOL, DSC_FACULTY) {
        return await this.SearchCarreer.search(DSC_CARRER, DSC_CODE, DSC_SCHOOL, DSC_FACULTY);
    }
    async searchUpdateAt(date1, date2) {
        return await this.SearchCarreer.searchUpdateAt(date1, date2);
    }
    async searchCreatedAt(date1, date2) {
        return await this.SearchCarreer.searchCreatedAt(date1, date2);
    }
    async searchState(state) {
        return await this.SearchCarreer.searchState(state);
    }
    async searchId(id) {
        return await this.SearchCarreer.searchId(id);
    }
    async getPageBySearch(limit, offset, DSC_CARRER, DSC_CODE, DSC_SCHOOL, DSC_FACULTY) {
        return await this.SearchCarreer.getPageBySearch(limit, offset, DSC_CARRER, DSC_CODE, DSC_SCHOOL, DSC_FACULTY);
    }
    async getPageInfo(pageSize = 8) {
        return await this.SearchCarreer.getPageInfo(pageSize = 8);
    }
}
module.exports = ControllerSearchCarreer;