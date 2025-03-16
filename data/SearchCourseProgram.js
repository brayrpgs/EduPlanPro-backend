const ConnectionDB = require("./ConnectionDB");

class SearchCourseProgram {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async search(DSC_CARRER, DSC_CODE, DSC_SCHOOL, DSC_FACULTY) {
        try {
            const sql = `SELECT
                            "EPPM_CAREER"."DSC_CARRER" AS "NOMBRE DE CARRERA",
                            "EPPM_CAREER"."DSC_CODE" AS "CODIGO DE CARRERA",
                            "EPPM_CAREER"."UPDATED AT" AS "ACTUALIZADO POR",
                            "EPPM_CAREER"."ID_CAREER",
                            "EPPM_SCHOOL"."DSC_SCHOOL" AS "NOMBRE DE LA ESCUELA",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "NOMBRE DE LA FACULTAD"
                        FROM
                            PUBLIC."EPPM_CAREER"
                            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPM_CAREER"."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_SCHOOL"."ID_FACULTY" = "EPPM_FACULTY"."ID_FACULTY"
                        WHERE
                            "EPPM_CAREER"."STATE" = '1'
                            AND (
                                "EPPM_CAREER"."DSC_CARRER" ILIKE $1::TEXT
                                AND "EPPM_CAREER"."DSC_CODE" ILIKE $2::TEXT
                                AND "EPPM_SCHOOL"."DSC_SCHOOL" ILIKE $3::TEXT
                                AND "EPPM_FACULTY"."DSC_FACULTY" ILIKE $4::TEXT
                            );`;
            const stmt = await this.conn.connect();
            const values = [`${DSC_CARRER}%`, `${DSC_CODE}%`, `${DSC_SCHOOL}%`, `${DSC_FACULTY}%`];
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

    async searchUpdateAt(date1, date2) {
        try {
            const sql = `SELECT
                            "EPPM_CAREER"."DSC_CARRER" AS "NOMBRE DE CARRERA",
                            "EPPM_CAREER"."DSC_CODE" AS "CODIGO DE CARRERA",
                            "EPPM_CAREER"."UPDATED AT" AS "ACTUALIZADO POR",
                            "EPPM_CAREER"."ID_CAREER",
                            "EPPM_SCHOOL"."DSC_SCHOOL" AS "NOMBRE DE LA ESCUELA",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "NOMBRE DE LA FACULTAD"
                        FROM
                            PUBLIC."EPPM_CAREER"
                            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPM_CAREER"."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_SCHOOL"."ID_FACULTY" = "EPPM_FACULTY"."ID_FACULTY"
                        WHERE
                            "EPPM_CAREER"."STATE" = '1'
                            AND (
                                "EPPM_CAREER"."UPDATED AT" BETWEEN $1::DATE AND $2::DATE
                            );`;
            const stmt = await this.conn.connect();
            const values = [date1, date2];
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
    async searchCreatedAt(date1, date2) {
        try {
            const sql = `SELECT
                            "EPPM_CAREER"."DSC_CARRER" AS "NOMBRE DE CARRERA",
                            "EPPM_CAREER"."DSC_CODE" AS "CODIGO DE CARRERA",
                            "EPPM_CAREER"."UPDATED AT" AS "ACTUALIZADO POR",
                            "EPPM_CAREER"."ID_CAREER",
                            "EPPM_SCHOOL"."DSC_SCHOOL" AS "NOMBRE DE LA ESCUELA",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "NOMBRE DE LA FACULTAD"
                        FROM
                            PUBLIC."EPPM_CAREER"
                            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPM_CAREER"."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_SCHOOL"."ID_FACULTY" = "EPPM_FACULTY"."ID_FACULTY"
                        WHERE
                            "EPPM_CAREER"."STATE" = '1'
                            AND (
                                "EPPM_CAREER"."CREATED_AT" BETWEEN $1::DATE AND $2::DATE
                            );`;
            const stmt = await this.conn.connect();
            const values = [date1, date2];
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
    async searchState(state) {
        try {
            const sql = `SELECT
                            "EPPM_CAREER"."DSC_CARRER" AS "NOMBRE DE CARRERA",
                            "EPPM_CAREER"."DSC_CODE" AS "CODIGO DE CARRERA",
                            "EPPM_CAREER"."UPDATED AT" AS "ACTUALIZADO POR",
                            "EPPM_CAREER"."ID_CAREER",
                            "EPPM_SCHOOL"."DSC_SCHOOL" AS "NOMBRE DE LA ESCUELA",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "NOMBRE DE LA FACULTAD"
                        FROM
                            PUBLIC."EPPM_CAREER"
                            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPM_CAREER"."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_SCHOOL"."ID_FACULTY" = "EPPM_FACULTY"."ID_FACULTY"
                        WHERE
                            "EPPM_CAREER"."STATE" = $1::CHAR;`;
            const stmt = await this.conn.connect();
            const values = [state];
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

    async searchId(id) {
        try {
            const sql = `SELECT
                            "EPPM_CAREER"."DSC_CARRER" AS "NOMBRE DE CARRERA",
                            "EPPM_CAREER"."DSC_CODE" AS "CODIGO DE CARRERA",
                            "EPPM_CAREER"."UPDATED AT" AS "ACTUALIZADO POR",
                            "EPPM_CAREER"."ID_CAREER",
                            "EPPM_SCHOOL"."DSC_SCHOOL" AS "NOMBRE DE LA ESCUELA",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "NOMBRE DE LA FACULTAD"
                        FROM
                            PUBLIC."EPPM_CAREER"
                            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPM_CAREER"."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_SCHOOL"."ID_FACULTY" = "EPPM_FACULTY"."ID_FACULTY"
                        WHERE
                            "EPPM_CAREER"."ID_CAREER" = $1::INTEGER;`;
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
    async getPageBySearch(limit, offset, DSC_CARRER, DSC_CODE, DSC_SCHOOL, DSC_FACULTY) {
        try {
            const sql = `SELECT
                            "EPPM_CAREER"."DSC_CARRER" AS "NOMBRE DE CARRERA",
                            "EPPM_CAREER"."DSC_CODE" AS "CODIGO DE CARRERA",
                            "EPPM_CAREER"."UPDATED AT" AS "ACTUALIZADO POR",
                            "EPPM_CAREER"."ID_CAREER",
                            "EPPM_SCHOOL"."DSC_SCHOOL" AS "NOMBRE DE LA ESCUELA",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "NOMBRE DE LA FACULTAD"
                        FROM
                            PUBLIC."EPPM_CAREER"
                            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPM_CAREER"."ID_SCHOOL"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_SCHOOL"."ID_FACULTY" = "EPPM_FACULTY"."ID_FACULTY"
                        WHERE
                            "EPPM_CAREER"."STATE" = '1'
                            AND (
                                "EPPM_CAREER"."DSC_CARRER" ILIKE $1::TEXT
                                AND "EPPM_CAREER"."DSC_CODE" ILIKE $2::TEXT
                                AND "EPPM_SCHOOL"."DSC_SCHOOL" ILIKE $3::TEXT
                                AND "EPPM_FACULTY"."DSC_FACULTY" ILIKE $4::TEXT
                            )
                        ORDER BY
                            "EPPM_CAREER"."DSC_CARRER" ASC
                        LIMIT
                            $5::INTEGER
                        OFFSET
                            $6::INTEGER;`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [`${DSC_CARRER}%`, `${DSC_CODE}%`, `${DSC_SCHOOL}%`, `${DSC_FACULTY}%`, limit, offset]);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                                COUNT("EPPM_CAREER"."ID_CAREER") AS "TOTAL COINCIDENCIAS"
                            FROM
                                PUBLIC."EPPM_CAREER"
                                INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPM_CAREER"."ID_SCHOOL"
                                INNER JOIN "EPPM_FACULTY" ON "EPPM_SCHOOL"."ID_FACULTY" = "EPPM_FACULTY"."ID_FACULTY"
                            WHERE
                                "EPPM_CAREER"."STATE" = '1'
                                AND (
                                    "EPPM_CAREER"."DSC_CARRER" ILIKE $1::TEXT
                                    AND "EPPM_CAREER"."DSC_CODE" ILIKE $2::TEXT
                                AND "EPPM_SCHOOL"."DSC_SCHOOL" ILIKE $3::TEXT
                                AND "EPPM_FACULTY"."DSC_FACULTY" ILIKE $4::TEXT
                                )`;
            const result2 = await stmt.query(sql2, [`${DSC_CARRER}%`, `${DSC_CODE}%`, `${DSC_SCHOOL}%`, `${DSC_FACULTY}%`]);
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
    async getPageInfo(pageSize = 8) {
        try {
            const sql = `SELECT
                            COUNT("EPPM_CAREER"."STATE") AS "total"
                        FROM
                            PUBLIC."EPPM_CAREER"
                        WHERE
                            "EPPM_CAREER"."STATE" = '1'`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql);
            console.log(result);

            const totalRecords = parseInt(result.rows[0].total, 10);
            const totalPages = Math.ceil(totalRecords / pageSize);

            return {
                totalRecords,
                totalPages,
                pageSize
            };
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.conn.disconnect();
        }
    }
}
module.exports = SearchCourseProgram;