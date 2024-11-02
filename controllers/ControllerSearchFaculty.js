const SearchFaculty = require("../data/SearchFaculty");

class ControllerSearchFaculty {
    constructor(parameters) {
        this.SearchFaculty = new SearchFaculty();
    }
    async search(name) {
        return await this.SearchFaculty.search(name);
    }
    async searchUpdateAt(date1, date2) {
        return await this.SearchFaculty.searchUpdateAt(date1, date2);
    }
    async searchCreatedAt(date1, date2) {
        return await this.SearchFaculty.searchCreatedAt(date1, date2);
    }
    async searchState(state) {
        return await this.SearchFaculty.searchState(state);
    }
    async searchId(id) {
        return await this.SearchFaculty.searchId(id);
    }
    async getPageBySearch(limit, offset, search) {
        return await this.SearchFaculty.getPageBySearch(limit, offset, search);
    }
    async getPageInfo(pageSize = 8) {
        return await this.SearchFaculty.getPageInfo(pageSize = 8);
    }
}
module.exports = ControllerSearchFaculty;