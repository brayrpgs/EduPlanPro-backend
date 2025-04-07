const Forgotpassword = require("../data/ForgotPassword");

class ControllerForgotPassword {
    
    constructor(){
        this.Forgotpassword = new Forgotpassword();
    }

    async getUserWithPassword(question1, question2, question3) {
        return await this.Forgotpassword.getUserWithPassword(question1, question2, question3);
    }

    async updatePassword(user) {
        return await this.Forgotpassword.updatePassword(user);
    }

}

module.exports = ControllerForgotPassword;