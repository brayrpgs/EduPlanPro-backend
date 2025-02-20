const ConnectionDB = require("./ConnectionDB");

class SchoolPhone {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }

    async insert(ID_SCHOOL, ID_PHONE) {
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPT_PHONE_SCHOOL" ("ID_SCHOOL", "ID_PHONE")
                        VALUES
                            ($1::INTEGER, $2::INTEGER);`;
            const stmt = await this.conn.connect();
            const values = [ID_SCHOOL, ID_PHONE];
            await stmt.query(sql, values);
            return true;
        } catch (error) {
            console.log(error);
            return error.code;
        }
        finally {
            this.conn.disconnect();
        }

    }

    async getAll() {
        try {
            const sql = `SELECT
                            "EPPT_PHONE_SCHOOL"."ID_PHONE_SCHOOL",
                            "EPPM_SCHOOL"."DSC_SCHOOL" AS "ESCUELA",
                            "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "TELEFONO"
                        FROM
                            PUBLIC."EPPT_PHONE_SCHOOL"
                            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPT_PHONE_SCHOOL"."ID_SCHOOL"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_PHONE_SCHOOL"."ID_PHONE"
                        WHERE
                            "EPPM_SCHOOL"."STATE" = '1'
                            AND "EPPM_PHONE"."STATE" = '1';`;
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

    async deleteById(id) {
        try {
            const sql = `DELETE FROM PUBLIC."EPPT_PHONE_SCHOOL"
                        WHERE
                            "ID_PHONE_SCHOOL" = $1::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [id];
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

    async updateById(ID_SCHOOL, ID_PHONE, id) {
        try {
            const sql = `UPDATE PUBLIC."EPPT_PHONE_SCHOOL"
                            SET
                                "ID_SCHOOL" = $1::INTEGER,
                                "ID_PHONE" = $2::INTEGER
                            WHERE
                                "ID_PHONE_SCHOOL" = $3::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [ID_SCHOOL, ID_PHONE, id];
            const result = await stmt.query(sql, values);
            return result.rows;
        } catch (error) {
            return error.code;
        }
        finally {
            this.conn.disconnect();
        }
    }
}
module.exports = SchoolPhone;