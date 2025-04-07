const ConnectionDB = require("./ConnectionDB");

class Preferences {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(ID_USER, PREFERENCES) {
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
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async getAll(id) {
        try {
            const sql = `SELECT
                            "ID_PREFERENCES",
                            "ID_USER",
                            "PREFERENCES" AS "PREFERENCIAS"
                        FROM
                            PUBLIC."EPPP_PREFERENCES"
                        WHERE
                            "ID_USER" = $1::INTEGER`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [id]);
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
            const sql = `DELETE FROM PUBLIC."EPPP_PREFERENCES"
                            WHERE
                                "ID_USER" = $1::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [id];
            await stmt.query(sql, values);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(ID_USER,PREFERENCES) {
        try {
            const sql = `UPDATE PUBLIC."EPPP_PREFERENCES"
                        SET
                            "PREFERENCES" = $1::JSON
                        WHERE
                            "ID_USER" = $2::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [PREFERENCES, ID_USER];
            await stmt.query(sql, values);
            return true;
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