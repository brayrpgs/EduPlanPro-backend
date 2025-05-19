const ConnectionDB = require("./ConnectionDB");

class SearchTeacher {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }

    async getByState(state) {
        try {
            const sql = `SELECT
                            "EPPM_TEACHER"."ID_TEACHER",
                            "EPPM_PERSON"."DSC_NAME" AS "NOMBRE",
                            "EPPM_PERSON"."DSC_SECOND_NAME" AS "APELLIDOS",
                            "EPPM_PERSON"."IDCARD" AS "IDENTIFICACION",
                            "EPPM_TEACHER"."EMAIL" AS "CORREO",
                            "EPPM_PERSON2"."DSC_NAME" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_TEACHER"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"
                            INNER JOIN "EPPM_USER" ON "EPPM_USER"."ID_PERSON" = "EPPM_PERSON"."UPDATED_BY"
                            INNER JOIN "EPPM_PERSON" "EPPM_PERSON2" ON "EPPM_PERSON2"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                        WHERE
                            "EPPM_TEACHER"."STATE" = $1::CHAR`;
            const rows = (await (await this.conn.connect()).query(sql, [state])).rows
            return rows;
        } catch (error) {
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async getPageBySearch(limit = 8, offset, name, secName, idCard, email) {
        try {
            const sql = `SELECT
                            "EPPM_TEACHER"."ID_TEACHER",
                            "EPPM_PERSON"."DSC_NAME" AS "NOMBRE",
                            "EPPM_PERSON"."DSC_SECOND_NAME" AS "APELLIDOS",
                            "EPPM_PERSON"."IDCARD" AS "IDENTIFICACION",
                            "EPPM_TEACHER"."EMAIL" AS "CORREO",
                            "EPPM_PERSON2"."DSC_NAME" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_TEACHER"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"
                            INNER JOIN "EPPM_USER" ON "EPPM_USER"."ID_PERSON" = "EPPM_PERSON"."UPDATED_BY"
                            INNER JOIN "EPPM_PERSON" "EPPM_PERSON2" ON "EPPM_PERSON2"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                        WHERE
                            "EPPM_TEACHER"."STATE" = '1'
                            AND (
                                "EPPM_PERSON"."DSC_NAME" ILIKE $1::TEXT
                                AND "EPPM_PERSON"."DSC_SECOND_NAME" ILIKE $2::TEXT
                                AND "EPPM_PERSON"."IDCARD" ILIKE $3::TEXT
                                AND "EPPM_TEACHER"."EMAIL" ILIKE $4::TEXT
                            )
                        ORDER BY
                            "EPPM_PERSON"."DSC_NAME" ASC
                        LIMIT
                            $5::INTEGER
                        OFFSET
                            $6::INTEGER`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [`${name}%`, `${secName}%`, `${idCard}%`, `${email}%`, limit, offset]);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                            count("EPPM_TEACHER"."ID_TEACHER") AS "TOTAL COINCIDENCIAS"
                        FROM
                            PUBLIC."EPPM_TEACHER"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"
                            INNER JOIN "EPPM_USER" ON "EPPM_USER"."ID_PERSON" = "EPPM_PERSON"."UPDATED_BY"
                            INNER JOIN "EPPM_PERSON" "EPPM_PERSON2" ON "EPPM_PERSON2"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                        WHERE
                            "EPPM_TEACHER"."STATE" = '1'
                            AND (
                                "EPPM_PERSON"."DSC_NAME" ILIKE $1::TEXT
                                AND "EPPM_PERSON"."DSC_SECOND_NAME" ILIKE $2::TEXT
                                AND "EPPM_PERSON"."IDCARD" ILIKE $3::TEXT
                                AND "EPPM_TEACHER"."EMAIL" ILIKE $4::TEXT
                            )`;
            const result2 = await stmt.query(sql2, [`${name}%`, `${secName}%`, `${idCard}%`, `${email}%`]);
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
    async searchId(id) {
        try {
            const sql = `SELECT
                            "EPPM_TEACHER"."ID_TEACHER",
                            "EPPM_PERSON"."DSC_NAME" AS "NOMBRE",
                            "EPPM_PERSON"."DSC_SECOND_NAME" AS "APELLIDOS",
                            "EPPM_PERSON"."IDCARD" AS "IDENTIFICACION",
                            "EPPM_TEACHER"."EMAIL" AS "CORREO",
                            "EPPM_PERSON2"."DSC_NAME" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_TEACHER"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"
                            INNER JOIN "EPPM_USER" ON "EPPM_USER"."ID_PERSON" = "EPPM_PERSON"."UPDATED_BY"
                            INNER JOIN "EPPM_PERSON" "EPPM_PERSON2" ON "EPPM_PERSON2"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                        WHERE
                            "EPPM_TEACHER"."ID_TEACHER" = $1::INTEGER`;
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
            const sql = `SELECT COUNT("STATE") AS total FROM "EPPM_TEACHER" WHERE "STATE" = '1';`;
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

module.exports = SearchTeacher;