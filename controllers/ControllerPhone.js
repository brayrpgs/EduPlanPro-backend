const Phone = require("../data/Phone");

class ControllerPhone {
    constructor(parameters) {
        this.Phone = new Phone();
    }
    async insertPhone(NUM_PHONE_NUMBER, UPDATE_BY) {
        return await this.Phone.insert(NUM_PHONE_NUMBER, UPDATE_BY);
    }

    async getAllPhone() {
        return await this.Phone.getAll();
    }

    async deletePhoneByID(ID_PHONE) {
        return await this.Phone.deleteById(ID_PHONE);
    }

    async updatePhoneByID(NUM_PHONE_NUMBER, UPDATE_BY, STATE, ID_PHONE) {
        return await this.Phone.updateById(NUM_PHONE_NUMBER, UPDATE_BY, STATE, ID_PHONE);
    }


}

module.exports = ControllerPhone;