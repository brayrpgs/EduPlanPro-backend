const ConnectionDB = require("./ConnectionDB");

class SearchUser {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }

    async getPageBySearch(limit = 8, offset, name, secName, idCard) {
        try {
            const sql = `SELECT
                            T1."ID_USER",
                            T2."DSC_NAME" AS "NOMBRE",
                            T2."DSC_SECOND_NAME" AS "APELLIDOS",
                            T2."IDCARD" AS "IDENTIFICACION",
                            T3."DSC_NAME" AS "ROL",
                            T4."DSC_NAME" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_USER" T1
                            INNER JOIN "EPPM_PERSON" T2 ON T2."ID_PERSON" = T1."ID_PERSON"
                            INNER JOIN "EPPM_ROL" T3 ON T3."ID_ROL" = T1."ID_ROL"
                            INNER JOIN "EPPM_PERSON" T4 ON T4."ID_PERSON" = T1."ID_PERSON"
                        WHERE
                            (
                                T2."DSC_NAME" ILIKE $1::text
                                AND T2."DSC_SECOND_NAME" ILIKE $2::text
                                AND T2."IDCARD" ILIKE $3::text
                            )
                            AND T1."STATE" = '1'
                        ORDER BY
                            T2."DSC_NAME" ASC
                        LIMIT
                            $4::integer
                        OFFSET
                            $5::integer`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [`${name}%`, `${secName}%`, `${idCard}%`, limit, offset]);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                            COUNT(T1."ID_USER") AS "TOTAL COINCIDENCIAS"
                        FROM
                            PUBLIC."EPPM_USER" T1
                            INNER JOIN "EPPM_PERSON" T2 ON T2."ID_PERSON" = T1."ID_PERSON"
                            INNER JOIN "EPPM_ROL" T3 ON T3."ID_ROL" = T1."ID_ROL"
                            INNER JOIN "EPPM_PERSON" T4 ON T4."ID_PERSON" = T1."ID_PERSON"
                        WHERE
                            (
                                T2."DSC_NAME" ILIKE $1::text
                                AND T2."DSC_SECOND_NAME" ILIKE $2::text
                                AND T2."IDCARD" ILIKE $3::text
                            )
                            AND T1."STATE" = '1'`;
            const result2 = await stmt.query(sql2, [`${name}%`, `${secName}%`, `${idCard}%`]);
            //envio los dos datos
            return {
                rows: result.rows,
                totalMatches: result2.rows[0]["TOTAL COINCIDENCIAS"]
            };
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
                            T1."ID_SCHOOL",
                            T1."DSC_SCHOOL" AS "NOMBRE ESCUELA",
                            T2."DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T2."ID_FACULTY"
                        FROM
                            PUBLIC."EPPM_SCHOOL" T1
                            INNER JOIN PUBLIC."EPPM_FACULTY" T2 ON T1."ID_FACULTY" = T2."ID_FACULTY"
                        WHERE
                            T1."UPDATED_AT" BETWEEN $1::date AND $2::date;`;
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
                            T1."ID_SCHOOL",
                            T1."DSC_SCHOOL" AS "NOMBRE ESCUELA",
                            T2."DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T2."ID_FACULTY"
                        FROM
                            PUBLIC."EPPM_SCHOOL" T1
                            INNER JOIN PUBLIC."EPPM_FACULTY" T2 ON T1."ID_FACULTY" = T2."ID_FACULTY"
                        WHERE
                            T1."CREATED_AT" BETWEEN $1::date AND $2::date;`;
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
                            T1."ID_SCHOOL",
                            T1."DSC_SCHOOL" AS "NOMBRE ESCUELA",
                            T2."DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T2."ID_FACULTY"
                        FROM
                            PUBLIC."EPPM_SCHOOL" T1
                            INNER JOIN PUBLIC."EPPM_FACULTY" T2 ON T1."ID_FACULTY" = T2."ID_FACULTY"
                        WHERE
                            T1."STATE" = $1::char;`;
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
                            T1."ID_SCHOOL",
                            T1."DSC_SCHOOL" AS "NOMBRE ESCUELA",
                            T2."DSC_FACULTY" AS "NOMBRE FACULTAD",
                            T2."ID_FACULTY"
                        FROM
                            PUBLIC."EPPM_SCHOOL" T1
                            INNER JOIN PUBLIC."EPPM_FACULTY" T2 ON T1."ID_FACULTY" = T2."ID_FACULTY"
                        WHERE
                            T1."ID_SCHOOL" = $1::integer;`;
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

    async getPageInfo(pageSize = 8) {
        try {
            const sql = `SELECT COUNT("STATE") AS total FROM PUBLIC."EPPM_USER" WHERE "STATE" = '1';`;
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

module.exports = SearchUser;