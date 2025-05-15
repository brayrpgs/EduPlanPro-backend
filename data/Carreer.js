const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class Carreer {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY) {

        if (!validateFields(DSC_CARRER, "string") || !validateFields(UPDATED_BY, "number")) {
            return undefined;
        };

        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_CAREER" (
                                "DSC_CARRER",
                                "DSC_CODE",
                                "ID_SCHOOL",
                                "UPDATED_BY"
                            )
                        VALUES
                            ($1::text, $2::text, $3::integer, $4::integer);`;
            const stmt = await this.conn.connect();
            const values = [DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY];
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
                            "DSC_CARRER" AS "NOMBRE DE LA CARRERA",
                            "DSC_CODE" AS "CODIGO",
                            "ID_SCHOOL",
                            "UPDATED_BY" AS "ACTUALIZADO POR",
                            "STATE",
                            "ID_CAREER" 
                        FROM
                            PUBLIC."EPPM_CAREER";`;
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
            const sql = `DELETE FROM PUBLIC."EPPM_CAREER"
                            WHERE
                        "ID_CAREER" = $1::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [id];
            await stmt.query(sql, values);
            return "La carrera fue eliminada correctamente."
        } catch (error) {
            console.log(error)
            if (error.code === "23503") {
                return `La carrera no puede ser eliminada debido
                 a que aún está siendo requerida (usada) por un
                 plan de estudios. Asegúrese de revisar el módulo de plan de estudios
                  y la papelera.`;
            }
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY, STATE, ID_CAREER) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_CAREER"
                            SET
                                "DSC_CARRER" = $1::TEXT,
                                "DSC_CODE" = $2::TEXT,
                                "ID_SCHOOL" = $3::INTEGER,
                                "UPDATED_BY" = $4::INTEGER,
                                "UPDATED AT" = CURRENT_TIMESTAMP,
                                "STATE" = $5::CHAR
                            WHERE
                                "ID_CAREER" = $6::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [DSC_CARRER, DSC_CODE, ID_SCHOOL, UPDATED_BY, STATE, ID_CAREER];
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

module.exports = Carreer;