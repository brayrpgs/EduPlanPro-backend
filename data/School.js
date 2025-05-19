const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class School {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(desc, id, user) {
        if (!validateFields(desc, "string") || !validateFields(id, "number") || !validateFields(user, "number")) {
            return undefined;
        };
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_SCHOOL" ("DSC_SCHOOL", "ID_FACULTY", "UPDATED_BY")
                        VALUES
                            ($1::text, $2::integer, $3::integer);`;
            const stmt = await this.conn.connect();
            const values = [desc, id, user];
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
                            T1."ID_SCHOOL",
                            T1."DSC_SCHOOL" AS "NOMBRE ESCUELA",
                            T2."DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T2."ID_FACULTY"
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
            const sql = `DELETE FROM public."EPPM_SCHOOL"
	                    WHERE "ID_SCHOOL" = $1::integer;`;
            const stmt = await this.conn.connect();
            const values = [id];
            await stmt.query(sql, values);
            return "La Escuela fue Eliminada correctamente";
        } catch (error) {
            if (error.code === "23503") {
                return `La Escuela no puede ser eliminada debido
                a que aún está siendo requerida(usada) por una
                carrera.Asegúrese de revisar el módulo de carreras
                 y la papelera.`
            }
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(desc, faculty, user, stat, id) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_SCHOOL"
                        SET
                            "DSC_SCHOOL" = $1::text,
                            "ID_FACULTY" = $2::integer,
                            "UPDATED_BY" = $3::integer,
                            "STATE" = $4::char,
                            "UPDATED_AT" = CURRENT_TIMESTAMP
                        WHERE
                            "ID_SCHOOL" = $5::integer;`;
            const stmt = await this.conn.connect();
            const values = [desc, faculty, user, stat, id];
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
                            T1."ID_SCHOOL",
                            T1."DSC_SCHOOL" AS "NOMBRE ESCUELA",
                            T2."DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T2."ID_FACULTY"
                        FROM
                            PUBLIC."EPPM_SCHOOL" T1
                            INNER JOIN PUBLIC."EPPM_FACULTY" T2 ON T1."ID_FACULTY" = T2."ID_FACULTY"
                        WHERE
                            T1."STATE" = '0';`;
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

module.exports = School;