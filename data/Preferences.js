const ConnectionDB = require("./ConnectionDB");

class Preferences {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(ID_USER, PREFERENCES) {

        if (!validateFields(DSC_CARRER, "string") || !validateFields(UPDATED_BY, "number")) {
            return undefined;
        };

        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPP_PREFERENCES" ("ID_USER", "PREFERENCES")
                        VALUES
                            ($1::INTEGER, $2::JSON);`;
            const stmt = await this.conn.connect();
            const values = [ID_USER, PREFERENCES];
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
                            "ID_PREFERENCES",
                            "ID_USER",
                            "PREFERENCES" AS "PREFERENCIAS"
                        FROM
                            PUBLIC."EPPP_PREFERENCES";`;
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

    async deleteById(id) {
        try {
            const sql = `DELETE FROM PUBLIC."EPPP_PREFERENCES"
                            WHERE
                                "ID_PREFERENCES" = $1::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [id];
            const result = await stmt.query(sql, values);
            return result.rows;
        } catch (error) {
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(PREFERENCES, ID_USER) {
        try {
            const sql = `UPDATE PUBLIC."EPPP_PREFERENCES"
                        SET
                            "PREFERENCES" = $1::JSON
                        WHERE
                            "ID_USER" = $2::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [PREFERENCES, ID_USER];
            const result = await stmt.query(sql, values);
            console.log(result);
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

module.exports = Preferences;