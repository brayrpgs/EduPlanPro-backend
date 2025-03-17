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
                            "ID_TEACHER_COUSE_PROGRAM",
                            "EPPM_COURSE_PROGRAM"."ID_COURSE_PROGRAM",
                            "EPPM_COURSE_PROGRAM"."DAT_YEAR" AS "AÑO",
                            "EPPM_COURSE_PROGRAM"."CICLE" AS "CICLO",
                            "EPPM_COURSE_PROGRAM"."NRC",
                            "EPPM_COURSE_PROGRAM"."DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "EPPM_TEACHER"."ID_TEACHER",
                            "EPPM_PERSON"."DSC_NAME" AS "NOMBRE DEL PROFESOR",
                            "EPPM_PERSON"."DSC_SECOND_NAME" AS "APELLIDOS",
                            "EPPM_TEACHER"."EMAIL" AS "CORREO ELECTRONICO"
                        FROM
                            "EPPT_TEACHER_COURSE_PROGRAM"
                            INNER JOIN "EPPM_COURSE_PROGRAM" ON "EPPM_COURSE_PROGRAM"."ID_COURSE_PROGRAM" = "EPPT_TEACHER_COURSE_PROGRAM"."ID_COURSE_PROGRAM"
                            INNER JOIN "EPPM_TEACHER" ON "EPPM_TEACHER"."ID_TEACHER" = "EPPT_TEACHER_COURSE_PROGRAM"."ID_TEACHER"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"`;
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
            const sql = `DELETE FROM PUBLIC."EPPT_TEACHER_COURSE_PROGRAM"
                            WHERE
                               "ID_TEACHER_COUSE_PROGRAM" = $1::INTEGER;`;
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
}

module.exports = TeacherCourseProgram;