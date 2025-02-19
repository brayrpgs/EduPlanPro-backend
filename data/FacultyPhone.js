const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class FacultyPhone {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(ID_FACULTY, ID_PHONE) {
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPT_FACULTY_PHONE" ("ID_FACULTY", "ID_PHONE")
                        VALUES
                            ($1::INTEGER, $2::INTEGER);`;
            const stmt = await this.conn.connect();
            const values = [ID_FACULTY, ID_PHONE];
            await stmt.query(sql, values);
            return true;
        } catch (error) {
            return error.code;
        }
        finally {
            this.conn.disconnect();
        }

    }

    async getAll() {
        try {
            const sql = `SELECT
                            "ID_FACULTY_PHONE",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "FACULTAD",
                            "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "TELEFONO"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            "EPPM_FACULTY"."STATE" = '1'
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
            const sql = `DELETE FROM PUBLIC."EPPT_FACULTY_PHONE"
                        WHERE
                            "ID_FACULTY_PHONE" = $1::INTEGER;`;
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

    async updateById(ID_FACULTY, ID_PHONE, id) {
        try {
            const sql = `UPDATE PUBLIC."EPPT_FACULTY_PHONE"
                            SET
                                "ID_FACULTY" = $1::INTEGER,
                                "ID_PHONE" = $2::INTEGER
                            WHERE
                                "ID_FACULTY_PHONE" = $3::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [ID_FACULTY, ID_PHONE, id];
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

module.exports = FacultyPhone;