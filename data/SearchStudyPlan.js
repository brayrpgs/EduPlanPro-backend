const ConnectionDB = require("./ConnectionDB");

class SearchStudyPlan {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async search(DSC_NAME, DAT_INIT, DAT_MAX, DSC_CARRER) {
        try {
            const sql = `SELECT
                            T1."ID_STUDY_PLAN",
                            T1."DSC_NAME" AS "NOMBRE DEL PLAN DE ESTUDIO",
                            T1."DAT_INIT" AS "FECHA INICIAL",
                            T1."DAT_MAX" AS "FECHA MAXIMA",
                            T2."DSC_CARRER" AS "CARRERA",
                            T1."UPDATED_BY" AS "ACTUALIZADO POR",
                            T1."PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN" T1
                            INNER JOIN "EPPM_CAREER" T2 ON T2."ID_CAREER" = T1."ID_CAREER"
                        WHERE
                            T1."STATE" = '1'
                            AND T1."DSC_NAME" ILIKE $1
                            AND T2."DSC_CARRER" ILIKE $4
                            AND (T1."DAT_INIT" = $2 OR $2 IS NULL)
                            AND (T1."DAT_MAX" = $3 OR $3 IS NULL);`;

            const stmt = await this.conn.connect();

            const values = [
                `${DSC_NAME}%`,  // ILIKE necesita el % para búsqueda parcial
                DAT_INIT || null, // Si no se pasa una fecha, enviamos NULL
                DAT_MAX || null,
                `${DSC_CARRER}%`
            ];

            const result = await stmt.query(sql, values);
            return result.rows;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.conn.disconnect();
        }
    }

    async searchUpdateAt(date1, date2) {
        try {
            const sql = `SELECT
                            T1."ID_STUDY_PLAN",
                            T1."DSC_NAME" AS "NOMBRE DEL PLAN DE ESTUDIO",
                            T1."DAT_INIT" AS "FECHA INICIAL",
                            T1."DAT_MAX" AS "FECHA MAXIMA",
                            T2."DSC_CARRER" AS "CARRERA",
                            T1."UPDATED_BY" AS "ACTUALIZADO POR",
                            T1."PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN" T1
                            INNER JOIN "EPPM_CAREER" T2 ON T2."ID_CAREER" = T1."ID_CAREER"
                        WHERE
                            T1."STATE" = '1'
                            AND (T1."UPDATED_AT" BETWEEN $1::DATE AND $2::DATE)`;
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
                            T1."ID_STUDY_PLAN",
                            T1."DSC_NAME" AS "NOMBRE DEL PLAN DE ESTUDIO",
                            T1."DAT_INIT" AS "FECHA INICIAL",
                            T1."DAT_MAX" AS "FECHA MAXIMA",
                            T2."DSC_CARRER" AS "CARRERA",
                            T1."UPDATED_BY" AS "ACTUALIZADO POR",
                            T1."PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN" T1
                            INNER JOIN "EPPM_CAREER" T2 ON T2."ID_CAREER" = T1."ID_CAREER"
                        WHERE
                            T1."STATE" = '1'
                            AND (T1."CREATED_AT" BETWEEN $1::DATE AND $2::DATE)`;
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
                            T1."ID_STUDY_PLAN",
                            T1."DSC_NAME" AS "NOMBRE DEL PLAN DE ESTUDIO",
                            T1."DAT_INIT" AS "FECHA INICIAL",
                            T1."DAT_MAX" AS "FECHA MAXIMA",
                            T2."DSC_CARRER" AS "CARRERA",
                            T1."UPDATED_BY" AS "ACTUALIZADO POR",
                            T1."PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN" T1
                            INNER JOIN "EPPM_CAREER" T2 ON T2."ID_CAREER" = T1."ID_CAREER"
                        WHERE
                            T1."STATE" = $1::CHAR`;
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
                            T1."ID_STUDY_PLAN",
                            T1."DSC_NAME" AS "NOMBRE DEL PLAN DE ESTUDIO",
                            T1."DAT_INIT" AS "FECHA INICIAL",
                            T1."DAT_MAX" AS "FECHA MAXIMA",
                            T2."DSC_CARRER" AS "CARRERA",
                            T1."UPDATED_BY" AS "ACTUALIZADO POR",
                            T1."PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN" T1
                            INNER JOIN "EPPM_CAREER" T2 ON T2."ID_CAREER" = T1."ID_CAREER"
                        WHERE
                            T1."ID_STUDY_PLAN" = $1::INTEGER`;
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
    async getPageBySearch(limit, offset, DSC_NAME, DAT_INIT, DAT_MAX, DSC_CARRER) {
        try {
            console.log(limit, offset, DSC_NAME, DAT_INIT, DAT_MAX, DSC_CARRER);
            
            const sql = `SELECT
                            T1."ID_STUDY_PLAN",
                            T1."DSC_NAME" AS "NOMBRE DEL PLAN DE ESTUDIO",
                            T1."DAT_INIT" AS "FECHA INICIAL",
                            T1."DAT_MAX" AS "FECHA MAXIMA",
                            T2."DSC_CARRER" AS "CARRERA",
                            T1."UPDATED_BY" AS "ACTUALIZADO POR",
                            T1."PDF_URL" AS "PDF"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN" T1
                            INNER JOIN "EPPM_CAREER" T2 ON T2."ID_CAREER" = T1."ID_CAREER"
                        WHERE
                            T1."STATE" = '1'
                            AND (
                                T1."DSC_NAME" ILIKE $1::TEXT
                                AND (T1."DAT_INIT" = $2 OR $2 IS NULL)
                                AND (T1."DAT_MAX" = $3 OR $3 IS NULL)
                                AND T2."DSC_CARRER" ILIKE $4::TEXT
                            )
                        ORDER BY
                            T1."DSC_NAME" ASC
                        LIMIT
                            $5::INTEGER
                        OFFSET
                            $6::INTEGER;`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [`${DSC_NAME}%`, DAT_INIT || null, DAT_MAX || null, `${DSC_CARRER}%`, limit, offset]);
            //ahora voy por el total de resultados
            const sql2 = `SELECT
                                COUNT(T1."ID_STUDY_PLAN") AS "TOTAL COINCIDENCIAS"
                            FROM
                                PUBLIC."EPPM_STUDY_PLAN" T1
                                INNER JOIN "EPPM_CAREER" T2 ON T2."ID_CAREER" = T1."ID_CAREER"
                            WHERE
                                T1."STATE" = '1'
                                AND (
                                     T1."DSC_NAME" ILIKE $1::TEXT
                                AND (T1."DAT_INIT" = $2 OR $2 IS NULL)
                                AND (T1."DAT_MAX" = $3 OR $3 IS NULL)
                                AND T2."DSC_CARRER" ILIKE $4::TEXT
                                )`;
            const result2 = await stmt.query(sql2, [`${DSC_NAME}%`, DAT_INIT || null, DAT_MAX || null, `${DSC_CARRER}%`]);
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
                            COUNT(T1."STATE") AS "total"
                        FROM
                            PUBLIC."EPPM_STUDY_PLAN" T1
                        WHERE
                            T1."STATE" = '1'`;
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
module.exports = SearchStudyPlan;