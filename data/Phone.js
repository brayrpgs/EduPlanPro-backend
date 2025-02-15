const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class Phone {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(NUM_PHONE_NUMBER, UPDATE_BY) {
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_PHONE" ("NUM_PHONE_NUMBER", "UPDATE_BY")
                        VALUES
                            ($1::TEXT, $2::INTEGER);`;
            const stmt = await this.conn.connect();
            const values = [NUM_PHONE_NUMBER, UPDATE_BY];
            const result = await stmt.query(sql, values);
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
                            "ID_PHONE",
                            "NUM_PHONE_NUMBER",
                            "STATE"
                        FROM
                            PUBLIC."EPPM_PHONE"
                        WHERE
                            "STATE" = '1';`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql);
            return result.rows;
        } catch (error) {
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async deleteById(ID_PHONE) {
        try {
            const sql = `DELETE FROM PUBLIC."EPPM_PHONE"
                        WHERE
                            "ID_PHONE" = $1::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [ID_PHONE];
            const result = await stmt.query(sql, values);
            return result.rows;
        } catch (error) {
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(NUM_PHONE_NUMBER, UPDATE_BY, STATE, ID_PHONE) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_PHONE"
                        SET
                            "NUM_PHONE_NUMBER" = $1::INTEGER,
                            "UPDATE_BY" = $2::INTEGER,
                            "UPDATE_AT" = CURRENT_TIMESTAMP,
                            "STATE" = $3::CHAR
                        WHERE
                            "ID_PHONE" = $4::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [NUM_PHONE_NUMBER, UPDATE_BY, STATE, ID_PHONE];
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

module.exports = Phone;