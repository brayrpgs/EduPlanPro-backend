const SearchUser = require("../data/SearchUser");

class ControllerSearchUser {
    constructor(parameters) {
        this.searchUser = new SearchUser();
    }

    async getPageBySearch(limit = 8, offset, name, secName, idCard) {
        return this.searchUser.getPageBySearch(limit = 8, offset, name, secName, idCard);
    }
    async getPageInfo(pageSize = 8) {
        return this.searchUser.getPageInfo(pageSize = 8);
    }
    async searchId(id) {
        return this.searchUser.searchId(id);
    }
}

module.exports = ControllerSearchUser;