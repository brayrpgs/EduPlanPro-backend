const ConnectionDB = require("./ConnectionDB");

class School {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(desc,id, user) {
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_SCHOOL" ("DSC_SCHOOL", "ID_FACULTY", "UPDATED_BY")
                        VALUES
                            ($1::text, $2::integer, $3::integer);`;
            const stmt = await this.conn.connect();
            const values = [desc,id, user];
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
                            T1."ID_SCHOOL",
                            T1."DSC_SCHOOL",
                            T2."DSC_FACULTY"
                        FROM
                            PUBLIC."EPPM_SCHOOL" T1
                            INNER JOIN PUBLIC."EPPM_FACULTY" T2 ON T1."ID_FACULTY" = T2."ID_FACULTY"
                        WHERE
                            T1."STATE" = '1';`;
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
            const sql = `DELETE FROM public."EPPM_FACULTY"
	                    WHERE "ID_FACULTY" = $1::integer;`;
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

    async updateById(desc, user, stat, id) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_FACULTY"
                        SET
                            "DSC_FACULTY" = $1::text,
                            "UPDATED_BY" = $2::integer,
                            "UPDATED_AT" = CURRENT_TIMESTAMP,
                            "STATE" = $3::char
                        WHERE
                            "ID_FACULTY" = $4::integer`;
            const stmt = await this.conn.connect();
            const values = [desc, user, stat, id];
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

module.exports = School;