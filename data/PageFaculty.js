const ConnectionDB = require("./ConnectionDB");

class PageFaculty {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }
    async getPage(limit, offset) { // `limit` y `offset` con valores predeterminados
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
                            ORDER BY
                        	"EPPM_FACULTY"."DSC_FACULTY" ASC
                        LIMIT $1::integer OFFSET $2::integer;`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, [limit, offset]);
            return result.rows;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.conn.disconnect();
        }
    }
    async getPageInfo(pageSize) {
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
module.exports = PageFaculty;