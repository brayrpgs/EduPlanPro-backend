const Person = require("../data/Person");

class ControllerPerson {
    constructor(parameters) {
        this.data = new Person;
    }

    async insert(name, secondName, idcard, updatedBy) {
        return await this.data.insert(name, secondName, idcard, updatedBy);
    }

}

module.exports = ControllerPerson;