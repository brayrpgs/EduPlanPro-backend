const SearchFacultyPhon = require("../data/SearchFacultyPhone");

class ControllerSearchFacultyPhone {
    constructor(parameters) {
        this.SearchFacultyPhon = new SearchFacultyPhon();
    }
    async search(name, name2) {
        return await this.SearchFacultyPhon.search(name, name2);
    }
    async searchUpdateAt(date1, date2) {
        return await this.SearchFacultyPhon.searchUpdateAt(date1, date2);
    }
    async searchCreatedAt(date1, date2) {
        return await this.SearchFacultyPhon.searchCreatedAt(date1, date2);
    }
    async searchState(state) {
        return await this.SearchFacultyPhon.searchState(state);
    }
    async searchId(id) {
        return await this.SearchFacultyPhon.searchId(id);
    }
    async getPageBySearch(limit, offset, search, search2) {
        return await this.SearchFacultyPhon.getPageBySearch(limit, offset, search, search2);
    }
    async getPageInfo(pageSize = 8) {
        return await this.SearchFacultyPhon.getPageInfo(pageSize = 8);
    }
}
module.exports = ControllerSearchFacultyPhone;