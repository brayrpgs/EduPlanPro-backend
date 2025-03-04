const ConnectionDB = require("./ConnectionDB");

class SearchFaculty {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async search(name) {
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
                            "EPPM_FACULTY"."STATE" = '1' AND "EPPM_FACULTY"."DSC_FACULTY" ILIKE $1::text;`;
            const stmt = await this.conn.connect();
            const values = [`${name}%`];
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
                            "EPPM_FACULTY"."ID_FACULTY",
                            "DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T3."IDCARD" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_FACULTY"
                            INNER JOIN PUBLIC."EPPM_USER" T2 ON "EPPM_FACULTY"."UPDATED_BY" = T2."ID_PERSON"
                            INNER JOIN "EPPM_PERSON" T3 ON T2."ID_USER" = T3."ID_PERSON"
                        WHERE
                            "EPPM_FACULTY"."UPDATED_AT" BETWEEN $1::date AND $2::date;`;
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
                            "EPPM_FACULTY"."ID_FACULTY",
                            "DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T3."IDCARD" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_FACULTY"
                            INNER JOIN PUBLIC."EPPM_USER" T2 ON "EPPM_FACULTY"."UPDATED_BY" = T2."ID_PERSON"
                            INNER JOIN "EPPM_PERSON" T3 ON T2."ID_USER" = T3."ID_PERSON"
                        WHERE
                            "EPPM_FACULTY"."CREATED_AT" BETWEEN $1::date AND $2::date;`;
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
                            "EPPM_FACULTY"."ID_FACULTY",
                            "DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T3."IDCARD" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_FACULTY"
                            INNER JOIN PUBLIC."EPPM_USER" T2 ON "EPPM_FACULTY"."UPDATED_BY" = T2."ID_PERSON"
                            INNER JOIN "EPPM_PERSON" T3 ON T2."ID_USER" = T3."ID_PERSON"
                        WHERE
                            "EPPM_FACULTY"."STATE" = $1::char;`;
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
                            "EPPM_FACULTY"."ID_FACULTY",
                            "DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T3."IDCARD" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_FACULTY"
                            INNER JOIN PUBLIC."EPPM_USER" T2 ON "EPPM_FACULTY"."UPDATED_BY" = T2."ID_PERSON"
                            INNER JOIN "EPPM_PERSON" T3 ON T2."ID_USER" = T3."ID_PERSON"
                        WHERE
                            "EPPM_FACULTY"."ID_FACULTY" = $1::integer;`;
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
    async getPageBySearch(limit, offset, search) {
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
                            "EPPM_FACULTY"."STATE" = '1'
                            AND "EPPM_FACULTY"."DSC_FACULTY" ILIKE $1::text
                        ORDER BY
                            "EPPM_FACULTY"."DSC_FACULTY" ASC
                        LIMIT
                            $2::integer
                        OFFSET
                            $3::integer;`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [`${search}%`, limit, offset]);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                            COUNT("EPPM_FACULTY"."ID_FACULTY") AS "TOTAL COINCIDENCIAS"
                        FROM
                            PUBLIC."EPPM_FACULTY"
                            INNER JOIN PUBLIC."EPPM_USER" T2 ON "EPPM_FACULTY"."UPDATED_BY" = T2."ID_PERSON"
                            INNER JOIN "EPPM_PERSON" T3 ON T2."ID_USER" = T3."ID_PERSON"
                        WHERE
                            "EPPM_FACULTY"."STATE" = '1'
                            AND "EPPM_FACULTY"."DSC_FACULTY" ILIKE $1::text`;
            const result2 = await stmt.query(sql2, [`${search}%`]);
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
            const sql = `SELECT COUNT("STATE") AS total FROM PUBLIC."EPPM_FACULTY" WHERE "STATE" = '1';`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql);

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
module.exports = SearchFaculty;