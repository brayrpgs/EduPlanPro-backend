const SearchFaculty = require("../data/SearchFaculty");

class ControllerSearchFaculty {
    constructor(parameters) {
        this.search = new SearchFaculty();
    }
}
module.exports = ControllerSearchFaculty;