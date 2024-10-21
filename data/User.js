const bcrypt = require('bcrypt');
const ConnectionDB = require('./ConnectionDB');

class User {
    constructor() {
        this.conn = new ConnectionDB;
    }

    async validateUser(idcard, password) {
        try {
            if (idcard === "root" && password === "root") {
                const user = await this.conn.connect();
                const res = await user.query(`SELECT
                                                "EPPM_PERSON"."DSC_NAME",
                                                "EPPM_PERSON"."DSC_SECOND_NAME",
                                                "EPPM_PERSON"."IDCARD",
                                                "EPPM_ROL"."DSC_NAME",
                                                "EPPM_USER"."ID_USER"
                                            FROM
                                                PUBLIC."EPPM_USER"
                                                INNER JOIN PUBLIC."EPPM_ROL" ON "EPPM_ROL"."ID_ROL" = "EPPM_USER"."ID_ROL"
                                                INNER JOIN PUBLIC."EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                                            WHERE
                                                "EPPM_PERSON"."IDCARD" = 'root';`
                );
                const result = await res.rows;
                return result;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
        finally {
            this.conn.disconnect();
        }
    }


}
module.exports = User;