const ConnectionDB = require('./ConnectionDB');

class Reports {
    constructor() {
        this.conn = new ConnectionDB;
    }

    /**
     * 
     * @param {[]} params 
     * @returns 
     */
    async getPageBySearch(params) {
        try {
            const sql = `SELECT
                            T1."ID_COURSE_PROGRAM",
                            T1."DSC_NAME" AS "PROGRAMA DEL CURSO",
                            T2."ID_STUDY_PLAN",
                            T2."DSC_NAME" AS "PLAN DE ESTUDIO",
                            T1."NRC",
                            T1."DAT_YEAR" AS "AÑO",
                            T1."NUM_CREDITS" AS "CREDITOS",
                            T1."CICLE" AS "CICLO",
                            T1."SIGNATURE" AS "FIRMA",
                            T4."EMAIL" AS "CORREO DEL PROFESOR",
                            T5."DSC_NAME" AS "NOMBRE DEL PROFESOR",
                            T5."DSC_SECOND_NAME" AS "APELLIDOS",
                            T6."DSC_CARRER" AS "CARRERA",
                            T6."DSC_CODE" AS "CODIGO DE CARRERA",
                            T7."DSC_SCHOOL" AS "ESCUELA",
                            T8."DSC_FACULTY" AS "FACULTAD",
                            T1."PDF_URL"
                        FROM
                            "EPPM_COURSE_PROGRAM" T1
                            INNER JOIN "EPPM_STUDY_PLAN" T2 ON T2."ID_STUDY_PLAN" = T1."ID_STUDY_PLAN"
                            INNER JOIN "EPPT_TEACHER_COURSE_PROGRAM" T3 ON T3."ID_COURSE_PROGRAM" = T1."ID_COURSE_PROGRAM"
                            INNER JOIN "EPPM_TEACHER" T4 ON T4."ID_TEACHER" = T3."ID_TEACHER"
                            INNER JOIN "EPPM_PERSON" T5 ON T5."ID_PERSON" = T4."ID_PERSON"
                            INNER JOIN "EPPM_CAREER" T6 ON T6."ID_CAREER" = T2."ID_CAREER"
                            INNER JOIN "EPPM_SCHOOL" T7 ON T7."ID_SCHOOL" = T6."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" T8 ON T8."ID_FACULTY" = T7."ID_FACULTY"
                        WHERE
                            T1."STATE" = '1'
                            AND (
                                T1."DSC_NAME" ILIKE $1::TEXT
                                AND T2."DSC_NAME" ILIKE $2::TEXT
                                AND T1."NRC" ILIKE $3::TEXT
                                AND (
                                    $4::DATE IS NULL
                                    OR T1."DAT_YEAR" = $4::DATE
                                )
                                AND (
                                    $5::INTEGER IS NULL
                                    OR T1."NUM_CREDITS" = $5::INTEGER
                                )
                                AND T1."CICLE" ILIKE $6::CHAR
                                AND T1."SIGNATURE" ILIKE $7::CHAR
                                AND T4."EMAIL" ILIKE $8::TEXT
                                AND T5."DSC_NAME" ILIKE $9::TEXT
                                AND T5."DSC_SECOND_NAME" ILIKE $10::TEXT
                                AND T6."DSC_CARRER" ILIKE $11::TEXT
                                AND T6."DSC_CODE" ILIKE $12::TEXT
                                AND T7."DSC_SCHOOL" ILIKE $13::TEXT
                                AND T8."DSC_FACULTY" ILIKE $14::TEXT
                            )
                        ORDER BY
                            T1."DSC_NAME" ASC
                        LIMIT
                            $15::INTEGER
                        OFFSET
                            $16::INTEGER;`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, params);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                             COUNT(T1."ID_COURSE_PROGRAM") AS "TOTAL COINCIDENCIAS"
                        FROM
                            "EPPM_COURSE_PROGRAM" T1
                            INNER JOIN "EPPM_STUDY_PLAN" T2 ON T2."ID_STUDY_PLAN" = T1."ID_STUDY_PLAN"
                            INNER JOIN "EPPT_TEACHER_COURSE_PROGRAM" T3 ON T3."ID_COURSE_PROGRAM" = T1."ID_COURSE_PROGRAM"
                            INNER JOIN "EPPM_TEACHER" T4 ON T4."ID_TEACHER" = T3."ID_TEACHER"
                            INNER JOIN "EPPM_PERSON" T5 ON T5."ID_PERSON" = T4."ID_PERSON"
                            INNER JOIN "EPPM_CAREER" T6 ON T6."ID_CAREER" = T2."ID_CAREER"
                            INNER JOIN "EPPM_SCHOOL" T7 ON T7."ID_SCHOOL" = T6."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" T8 ON T8."ID_FACULTY" = T7."ID_FACULTY"
                        WHERE
                            T1."STATE" = '1'
                            AND (
                                T1."DSC_NAME" ILIKE $1::TEXT
                                AND T2."DSC_NAME" ILIKE $2::TEXT
                                AND T1."NRC" ILIKE $3::TEXT
                                AND (
                                    $4::DATE IS NULL
                                    OR T1."DAT_YEAR" = $4::DATE
                                )
                                AND (
                                    $5::INTEGER IS NULL
                                    OR T1."NUM_CREDITS" = $5::INTEGER
                                )
                                AND T1."CICLE" ILIKE $6::CHAR
                                AND T1."SIGNATURE" ILIKE $7::CHAR
                                AND T4."EMAIL" ILIKE $8::TEXT
                                AND T5."DSC_NAME" ILIKE $9::TEXT
                                AND T5."DSC_SECOND_NAME" ILIKE $10::TEXT
                                AND T6."DSC_CARRER" ILIKE $11::TEXT
                                AND T6."DSC_CODE" ILIKE $12::TEXT
                                AND T7."DSC_SCHOOL" ILIKE $13::TEXT
                                AND T8."DSC_FACULTY" ILIKE $14::TEXT
                            )`;
            const params2 = params;
            params2.pop();
            params2.pop();
            const result2 = await stmt.query(sql2, params2);
            //envio los dos datos
            return {
                rows: result.rows,
                totalMatches: result2.rows[0]["TOTAL COINCIDENCIAS"]
            };
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.conn.disconnect();
        }
    }
}
module.exports = Reports;