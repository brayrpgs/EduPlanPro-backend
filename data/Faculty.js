const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class Faculty {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(name, user) {
        if (!validateFields(name, "string") || !validateFields(user, "number")) {
            return undefined;
        };
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_FACULTY" ("DSC_FACULTY", "UPDATED_BY")
                        VALUES
                            ($1::text, $2::integer);`;
            const stmt = await this.conn.connect();
            const values = [name, user];
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
                            "EPPM_FACULTY"."ID_FACULTY",
                            "DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T3."IDCARD" AS "ACTUALIZADO POR"
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

    async deleteById(id) {
        try {
            const sql = `DELETE FROM public."EPPM_FACULTY"
	                    WHERE "ID_FACULTY" = $1::integer;`;
            const stmt = await this.conn.connect();
            const values = [id];
            await stmt.query(sql, values);
            console.log(id);
            return "La facultad fue Eliminada correctamente";
        } catch (error) {
            if (error.code === "23503") {
                return `La facultad no puede ser eliminada debido
                 a que aún está siendo requerida (usada) por una 
                 escuela. Asegúrese de revisar el módulo de escuelas
                  y la papelera.`;
            }
            return false
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

    async getAllEliminated() {
        try {
            const sql = `SELECT
                            "EPPM_FACULTY"."ID_FACULTY",
                            "DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T3."IDCARD" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_FACULTY"
                            INNER JOIN PUBLIC."EPPM_USER" T2 ON "EPPM_FACULTY"."UPDATED_BY" = T2."ID_PERSON"
                            INNER JOIN "EPPM_PERSON" T3 ON T2."ID_USER" = T3."ID_PERSON"
                        WHERE
                            "EPPM_FACULTY"."STATE" = '0'`;
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