const ConnectionDB = require("./ConnectionDB");

class SearchFacultyPhone {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async search(name, name2) {
        try {
            const sql = `SELECT
                            "ID_FACULTY_PHONE",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "FACULTAD",
                            "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "NUMERO DE TELEFONO"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            (
                                "EPPM_FACULTY"."STATE" = '1'
                                AND "EPPM_PHONE"."STATE" = '1'
                            )
                            AND (
                                "EPPM_FACULTY"."DSC_FACULTY" ILIKE $1::TEXT
                                AND "EPPM_PHONE"."NUM_PHONE_NUMBER" ILIKE $2::TEXT
                            )`;
            const stmt = await this.conn.connect();
            const values = [`${name}%`, `${name2}%`];
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
                            "ID_FACULTY_PHONE",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "FACULTAD",
                            "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "NUMERO DE TELEFONO"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            "EPPM_PHONE"."UPDATE_AT" BETWEEN $1::DATE AND $2::DATE`;
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
                            "ID_FACULTY_PHONE",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "FACULTAD",
                            "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "NUMERO DE TELEFONO"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            "EPPM_PHONE"."CREATED_AT" BETWEEN $1::DATE AND $2::DATE`;
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
                            "ID_FACULTY_PHONE",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "FACULTAD",
                        "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "NUMERO DE TELEFONO"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            "EPPM_FACULTY"."STATE" = $1::CHAR
                            AND "EPPM_PHONE"."STATE" = $1::CHAR`;
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
                            "ID_FACULTY_PHONE",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "FACULTAD",
                            "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "NUMERO DE TELEFONO"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            "ID_FACULTY_PHONE" = $1::INTEGER`;
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

    async getPageBySearch(limit, offset, search, search2) {
        try {
            const sql = `SELECT
                            "ID_FACULTY_PHONE",
                            "EPPM_FACULTY"."DSC_FACULTY" AS "FACULTAD",
                            "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "NUMERO DE TELEFONO"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            (
                                "EPPM_FACULTY"."STATE" = '1'
                                AND "EPPM_PHONE"."STATE" = '1'
                            )
                            AND (
                                "EPPM_FACULTY"."DSC_FACULTY" ILIKE $1::TEXT
                                AND "EPPM_PHONE"."NUM_PHONE_NUMBER" ILIKE $2::TEXT
                            )
                        ORDER BY
                            "EPPM_FACULTY"."DSC_FACULTY"
                        LIMIT
                            $3::INTEGER
                        OFFSET
                            $4::INTEGER`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [`${search}%`, `${search2}%`, limit, offset]);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                            COUNT("ID_FACULTY_PHONE") AS "TOTAL COINCIDENCIAS"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            (
                                "EPPM_FACULTY"."STATE" = '1'
                                AND "EPPM_PHONE"."STATE" = '1'
                            )
                            AND (
                                "EPPM_FACULTY"."DSC_FACULTY" ILIKE $1::TEXT
                                AND "EPPM_PHONE"."NUM_PHONE_NUMBER" ILIKE $2::TEXT
                            )`;
            const result2 = await stmt.query(sql2, [`${search}%`, `${search2}%`]);
            console.log(result2);
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
                            COUNT("ID_FACULTY_PHONE") AS "total"
                        FROM
                            PUBLIC."EPPT_FACULTY_PHONE"
                            INNER JOIN "EPPM_FACULTY" ON "EPPM_FACULTY"."ID_FACULTY" = "EPPT_FACULTY_PHONE"."ID_FACULTY"
                            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_FACULTY_PHONE"."ID_PHONE"
                        WHERE
                            (
                                "EPPM_FACULTY"."STATE" = '1'
                                AND "EPPM_PHONE"."STATE" = '1'
                            )`;
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
module.exports = SearchFacultyPhone;