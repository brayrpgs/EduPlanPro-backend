const Faculty = require("../data/Faculty");

class ControllerFaculty {
    constructor(parameters) {
        this.faculty = new Faculty();
    }
    async insertFaculty(name,user){
        return await this.faculty.insert(name,user);
    }

    async getAllFaculty(){
        return await this.faculty.getAll();
    }

}

module.exports = ControllerFaculty;