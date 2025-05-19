const Eliminated = require("../data/Eliminated");

class ControllerEliminated {
    constructor() {
        this.Eliminated = new Eliminated();
    }

    async getAllEliminated() {
        return await this.Eliminated.getAllEliminatedFiles()
    }
    
}

module.exports = ControllerEliminated;