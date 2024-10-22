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
                            "EPPM_FACULTY"."STATE" = '1' AND "EPPM_FACULTY"."DSC_FACULTY" LIKE $1::text;`;
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
}
module.exports = SearchFaculty;