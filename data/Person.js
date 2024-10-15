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
                    $1::text,$2::text, $3::text, $4::integer
                    );`;
            const stmt = await this.conn.connect();
            const values = [name, secondName, idcard, parseInt(updatedBy, 10)];
            const result = await stmt.query(sql, values);
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
