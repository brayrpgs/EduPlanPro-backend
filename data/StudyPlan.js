const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class StudyPlan {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL) {

        if (!validateFields(DSC_NAME, "string") || !validateFields(DAT_INIT, "string") || !validateFields(DAT_MAX, "string")) {
            return undefined;
        };

        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_STUDY_PLAN" (
                                "DSC_NAME",
                                "DAT_INIT",
                                "DAT_MAX",
                                "ID_CAREER",
                                "UPDATED_BY",
                                "PDF_URL"
                            )
                        VALUES
                            ($1::TEXT, $2::DATE, $3::DATE, $4::INTEGER, $5::INTEGER, $6::TEXT);`;
            const stmt = await this.conn.connect();
            const values = [DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL];
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
                            "ID_STUDY_PLAN",
                            "DSC_NAME",
                            "DAT_INIT",
                            "DAT_MAX",
                            "ID_CAREER",
                            "UPDATED_BY",
                            "UPDATED_AT",
                            "CREATED_AT",
                            "PDF_URL",
                            "STATE"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN"
                        WHERE
                            "STATE" = '1';`;
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
            const sql = `DELETE FROM PUBLIC."EPPM_STUDY_PLAN"
                        WHERE
                            "ID_STUDY_PLAN" = $1::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [id];
            await stmt.query(sql, values);
            return "El Plan de estudios fue Eliminado correctamente";
        } catch (error) {
            console.log(error)
            if (error.code === "23503") {

                const sql = `SELECT
                            "DSC_NAME"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE "ID_STUDY_PLAN" = ${id};`
                const stmt = await this.conn.connect();
                const name = (await stmt.query(sql)).rows;
                console.log(name)
                return `El Plan de estudios no puede ser eliminada debido
                 a que aún está siendo requerida (usada) por un
                 programa del curso llamado **${name[0].DSC_NAME}**. Asegúrese de revisar el módulo de programas del curso
                  y la papelera.`;
            }
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL, STATE, ID_STUDY_PLAN) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_STUDY_PLAN"
                        SET
                            "DSC_NAME" = $1::TEXT,
                            "DAT_INIT" = $2::DATE,
                            "DAT_MAX" = $3::DATE,
                            "ID_CAREER" = $4::INTEGER,
                            "UPDATED_BY" = $5::INTEGER,
                            "UPDATED_AT" = CURRENT_TIMESTAMP,
                            "PDF_URL" = $6::TEXT,
                            "STATE" = $7::CHAR
                        WHERE
                            "ID_STUDY_PLAN" = $8::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [DSC_NAME, DAT_INIT, DAT_MAX, ID_CAREER, UPDATED_BY, PDF_URL, STATE, ID_STUDY_PLAN];
            const result = await stmt.query(sql, values);
            return result.rows;
        } catch (error) {
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }
}

module.exports = StudyPlan;