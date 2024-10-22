const SearchFaculty = require("../data/SearchFaculty");

class ControllerSearchFaculty {
    constructor(parameters) {
        this.SearchFaculty = new SearchFaculty();
    }
    async search(name) {
        return await this.SearchFaculty.search(name);
    }
}
module.exports = ControllerSearchFaculty;