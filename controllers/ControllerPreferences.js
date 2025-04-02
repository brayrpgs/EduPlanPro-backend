const Preferences = require("../data/Preferences");

class ControllerPreferences {
    constructor(parameters) {
        this.Preferences = new Preferences();
    }
    async insertPreferences(ID_USER, PREFERENCES) {
        return await this.Preferences.insert(ID_USER, PREFERENCES);
    }

    async getAllPreferences() {
        return await this.Preferences.getAll();
    }

    async deletePreferencesByID(id) {
        return await this.Preferences.deleteById(id);
    }

    async updatePreferencesByID(ID_USER, PREFERENCES) {
        return await this.Preferences.updateById(ID_USER, PREFERENCES);
    }
}

module.exports = ControllerPreferences;