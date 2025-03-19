const ConnectionDB = require("./ConnectionDB");

class SearchCourseProgram {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async search(DSC_NAME, DAT_YEAR, NRC, CICLE, NUM_CREDITS, SIGNATURE) {
        console.log(typeof DAT_YEAR || null);
        try {
            const sql = `SELECT
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "FECHA",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "CREDITOS",
                            "SIGNATURE" AS "FIRMA",
                            "UPDATED_AT" AS "FECHA DE ACTUALIZACION",
                            "CREATED_AT" AS "FECHA DE CREACION",
                            "PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "STATE" = '1'
                            AND (
                                "DSC_NAME" ILIKE $1::TEXT
                                AND ($2::DATE IS NULL OR "DAT_YEAR" = $2::DATE)
                                AND "NRC" ILIKE $3::TEXT
                                AND "CICLE" ILIKE $4::CHAR
                                AND ($5::INTEGER IS NULL OR "NUM_CREDITS" = $5::INTEGER)
                                AND "SIGNATURE" ILIKE $6::CHAR
                            )`;
            const stmt = await this.conn.connect();
            const values = [`${DSC_NAME}%`, DAT_YEAR || null, `${NRC}%`, `${CICLE}%` , NUM_CREDITS || null, `${SIGNATURE}%` || null];
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
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "FECHA",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "CREDITOS",
                            "SIGNATURE" AS "FIRMA",
                            "UPDATED_AT" AS "FECHA DE ACTUALIZACION",
                            "CREATED_AT" AS "FECHA DE CREACION",
                            "PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "STATE" = '1'
                            AND (
                                "UPDATED_AT" BETWEEN $1::DATE AND $2::DATE
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
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "FECHA",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "CREDITOS",
                            "SIGNATURE" AS "FIRMA",
                            "UPDATED_AT" AS "FECHA DE ACTUALIZACION",
                            "CREATED_AT" AS "FECHA DE CREACION",
                            "PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "STATE" = '1'
                            AND (
                                "CREATED_AT" BETWEEN $1::DATE AND $2::DATE
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
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "FECHA",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "CREDITOS",
                            "SIGNATURE" AS "FIRMA",
                            "UPDATED_AT" AS "FECHA DE ACTUALIZACION",
                            "CREATED_AT" AS "FECHA DE CREACION",
                            "PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "STATE" = $1::CHAR;`;
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
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "FECHA",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "CREDITOS",
                            "SIGNATURE" AS "FIRMA",
                            "UPDATED_AT" AS "FECHA DE ACTUALIZACION",
                            "CREATED_AT" AS "FECHA DE CREACION",
                            "PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "ID_COURSE_PROGRAM" = $1::INTEGER;`;
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
    async getPageBySearch(limit, offset, DSC_NAME, DAT_YEAR, NRC, CICLE, NUM_CREDITS, SIGNATURE) {
        try {
            const sql = `SELECT
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "FECHA",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "CREDITOS",
                            "SIGNATURE" AS "FIRMA",
                            "UPDATED_AT" AS "FECHA DE ACTUALIZACION",
                            "CREATED_AT" AS "FECHA DE CREACION",
                            "PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                           "STATE" = '1'
                            AND (
                                "DSC_NAME" ILIKE $1::TEXT
                                AND ($2::DATE IS NULL OR "DAT_YEAR" = $2::DATE)
                                AND "NRC" ILIKE $3::TEXT
                                AND "CICLE" ILIKE $4::CHAR
                                AND ($5::INTEGER IS NULL OR "NUM_CREDITS" = $5::INTEGER)
                                AND "SIGNATURE" ILIKE $6::CHAR
                            )
                        ORDER BY
                            "DSC_NAME" ASC
                        LIMIT
                            $7::INTEGER
                        OFFSET
                            $8::INTEGER;`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [`${DSC_NAME}%`, DAT_YEAR || null, `${NRC}%`, `${CICLE}%`, NUM_CREDITS || null, `${SIGNATURE}%` || null, limit, offset]);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                            "ID_COURSE_PROGRAM",
                            "DSC_NAME" AS "NOMBRE DEL PROGRAMA",
                            "DAT_YEAR" AS "FECHA",
                            "ID_STUDY_PLAN",
                            "NRC",
                            "CICLE" AS "CICLO",
                            "NUM_CREDITS" AS "CREDITOS",
                            "SIGNATURE" AS "FIRMA",
                            "UPDATED_AT" AS "FECHA DE ACTUALIZACION",
                            "CREATED_AT" AS "FECHA DE CREACION",
                            "PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "STATE" = '1'
                            AND (
                                "DSC_NAME" ILIKE $1::TEXT
                                AND ($2::DATE IS NULL OR "DAT_YEAR" = $2::DATE)
                                AND "NRC" ILIKE $3::TEXT
                                AND "CICLE" ILIKE $4::CHAR
                                AND ($5::INTEGER IS NULL OR "NUM_CREDITS" = $5::INTEGER)
                                AND "SIGNATURE" ILIKE $6::CHAR
                            )`;
            const result2 = await stmt.query(sql2, [`${DSC_NAME}%`, DAT_YEAR || null, `${NRC}%`, `${CICLE}%`, NUM_CREDITS || null, `${SIGNATURE}%` || null]);
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
                            COUNT("ID_COURSE_PROGRAM") AS "total"
                        FROM
                            PUBLIC."EPPM_COURSE_PROGRAM"
                        WHERE
                            "STATE" = '1'`;
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