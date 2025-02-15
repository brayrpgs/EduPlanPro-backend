const validateFields = require("../services/validateFields");
const ConnectionDB = require("./ConnectionDB");

class TeacherCourseProgram {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async insert(ID_TEACHER, ID_COURSE_PROGRAM) {

        if (!validateFields(ID_TEACHER, "number") || !validateFields(ID_COURSE_PROGRAM, "number")) {
            return undefined;
        };

        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPT_TEACHER_COURSE_PROGRAM" ("ID_TEACHER", "ID_COURSE_PROGRAM")
                        VALUES
                            ($1::INTEGER, $2::INTEGER);`;
            const stmt = await this.conn.connect();
            const values = [ID_TEACHER, ID_COURSE_PROGRAM];
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
            const result = await stmt.query(sql, values);
            return result.rows;
        } catch (error) {
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

module.exports = TeacherCourseProgram;