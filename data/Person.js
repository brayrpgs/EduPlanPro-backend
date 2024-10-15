const ConnectionDB = require("./ConnectionDB");

class Person {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(name, secondName, idcard, updatedBy) {
        try {
            const sql = `INSERT INTO
             public."EPPM_PERSON"("DSC_NAME", "DSC_SECOND_NAME", "IDCARD", "UPDATED_BY")
                    VALUES (
                    $1::text,$2::text, $3::text, $4::text
                    );`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, { name, secondName, idcard, updatedBy });
            return result.rows;
        } catch (error) {
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }

    }
}

module.exports = Person;
