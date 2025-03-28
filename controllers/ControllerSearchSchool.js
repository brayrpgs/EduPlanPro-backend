const SearchSchool = require("../data/SearchSchool");

class ControllerSearchSchool {
    constructor(parameters) {
        this.SearchSchool = new SearchSchool();
    }
    async search(name , name2) {
        return await this.SearchSchool.search(name , name2);
    }
    async searchUpdateAt(date1, date2) {
        return await this.SearchSchool.searchUpdateAt(date1, date2);
    }
    async searchCreatedAt(date1, date2) {
        return await this.SearchSchool.searchCreatedAt(date1, date2);
    }
    async searchState(state) {
        return await this.SearchSchool.searchState(state);
    }
    async searchId(id) {
        return await this.SearchSchool.searchId(id);
    }
    async getPageBySearch(limit, offset, search, search2) {
        return await this.SearchSchool.getPageBySearch(limit, offset, search, search2);
    }
    async getPageInfo(pageSize = 8) {
        return await this.SearchSchool.getPageInfo(pageSize = 8);
    }
}
module.exports = ControllerSearchSchool;