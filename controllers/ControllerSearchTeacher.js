const SearchTeacher = require("../data/SearchTeacher");

class ControllerSearchTeacher {
    constructor(parameters) {
        this.searchTeacher = new SearchTeacher();
    }
    async getPageBySearch(limit = 8, offset, name, secName, idCard, email) {
        return this.searchTeacher.getPageBySearch(limit = 8, offset, name, secName, idCard, email);
    }

    async getPageInfo(pageSize = 8){
        return this.searchTeacher.getPageInfo(pageSize = 8);
    }

    async searchId(id) {
        return this.searchTeacher.searchId(id);
    }
}
module.exports = ControllerSearchTeacher;