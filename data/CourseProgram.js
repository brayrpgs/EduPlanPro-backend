const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class CourseProgram {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL) {
        if (!validateFields(NRC, "string") || !validateFields(DSC_NAME, "string") || !validateFields(NUM_CREDITS, "number")) {
            return undefined;
        };
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_COURSE_PROGRAM" (
                                "DSC_NAME",
                                "DAT_YEAR",
                                "ID_STUDY_PLAN",
                                "NRC",
                                "CICLE",
                                "NUM_CREDITS",
                                "SIGNATURE",
                                "UPDATED_BY",
                                "PDF_URL"
                            )
                        VALUES
                            (
                                $1::TEXT,
                                $2::DATE,
                                $3::INTEGER,
                                $4::TEXT,
                                $5::CHAR,
                                $6::INTEGER,
                                $7::CHAR,
                                $8::INTEGER,
                                $9::TEXT
                            );`;
            const stmt = await this.conn.connect();
            const values = [DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL];
            await stmt.query(sql, values);
            return true;
        } catch (error) {
            //console.log(error);
            return error.code;
        }
        finally {
            this.conn.disconnect();
        }

    }

    async getAll() {
        try {
            const sql = `SELECT
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "AÑO",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "NUMERO DE CREDITOS",
                            "SIGNATURE" AS "FIRMA DIGITAL",
                            "UPDATED_BY",
                            "UPDATED_AT",
                            "CREATED_AT",
                            "PDF_URL" AS "PDF",
                            "STATE" AS "ESTADO"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM";`;
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
            const sql = `DELETE FROM PUBLIC."EPPM_COURSE_PROGRAM"
                            WHERE
                                "ID_COURSE_PROGRAM" = $1::INTEGER;`;
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

    async updateById(DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL, STATE, ID_COURSE_PROGRAM) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_COURSE_PROGRAM"
                            SET
                                "DSC_NAME" = $1::TEXT,
                                "DAT_YEAR" = $2::DATE,
                                "ID_STUDY_PLAN" = $3::INTEGER,
                                "NRC" = $4::TEXT,
                                "CICLE" = $5::CHAR,
                                "NUM_CREDITS" = $6::INTEGER,
                                "SIGNATURE" = $7::CHAR,
                                "UPDATED_BY" = $8::INTEGER,
                                "UPDATED_AT" = CURRENT_TIMESTAMP,
                                "PDF_URL" = $9::TEXT,
                                "STATE" = $10::CHAR
                            WHERE
                                "ID_COURSE_PROGRAM" = $11::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [DSC_NAME, DAT_YEAR, ID_STUDY_PLAN, NRC, CICLE, NUM_CREDITS, SIGNATURE, UPDATED_BY, PDF_URL, STATE, ID_COURSE_PROGRAM];
            const result = await stmt.query(sql, values);
            //console.log(result);
            return result.rows;
        } catch (error) {
            console.log(error);
            return error.code;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async getAllEliminated() {
        try {
            const sql = `SELECT
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "AÑO",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "NUMERO DE CREDITOS",
                            "SIGNATURE" AS "FIRMA DIGITAL",
                            "UPDATED_BY",
                            "UPDATED_AT",
                            "CREATED_AT",
                            "PDF_URL" AS "PDF",
                            "STATE" AS "ESTADO"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "STATE" = '0';`;
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
}

module.exports = CourseProgram;