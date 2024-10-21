const ConnectionDB = require("./ConnectionDB");

class Faculty {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(name, user) {
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_FACULTY" ("DSC_FACULTY", "UPDATED_BY")
                        VALUES
                            ($1::text, $2::integer);`;
            const stmt = await this.conn.connect();
            const values = [name, user];
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

    async getAll() {
        try {
            const sql = `SELECT
                            "DSC_FACULTY",
                            T3."IDCARD" AS "UPDATED_BY"
                        FROM
                            PUBLIC."EPPM_FACULTY"
                            INNER JOIN PUBLIC."EPPM_USER" T2 ON "EPPM_FACULTY"."UPDATED_BY" = T2."ID_PERSON"
                            INNER JOIN "EPPM_PERSON" T3 ON T2."ID_USER" = T3."ID_PERSON"
                        WHERE
                            "EPPM_FACULTY"."STATE" = '1'`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql);
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

module.exports = Faculty;