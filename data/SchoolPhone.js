const ConnectionDB = require("./ConnectionDB");

class SchoolPhone {
    constructor() {
        this.conn = new ConnectionDB();
    }

    async insert(ID_SCHOOL, ID_PHONE) {
        const sql = `
            INSERT INTO PUBLIC."EPPT_PHONE_SCHOOL" ("ID_SCHOOL", "ID_PHONE")
            VALUES ($1::INTEGER, $2::INTEGER);
        `;
        const values = [ID_SCHOOL, ID_PHONE];

        try {
            const stmt = await this.conn.connect();
            await stmt.query(sql, values);
            return { success: true };
        } catch (error) {
            console.error("Error en insert (SchoolPhone):", error);
            return { success: false, error: error.code || error.message };
        } finally {
            this.conn.disconnect();
        }
    }

    async getAll() {
        const sql = `
            SELECT
                "EPPT_PHONE_SCHOOL"."ID_PHONE_SCHOOL",
                "EPPM_SCHOOL"."DSC_SCHOOL" AS "ESCUELA",
                "EPPM_PHONE"."NUM_PHONE_NUMBER" AS "TELEFONO"
            FROM
                PUBLIC."EPPT_PHONE_SCHOOL"
            INNER JOIN "EPPM_SCHOOL" ON "EPPM_SCHOOL"."ID_SCHOOL" = "EPPT_PHONE_SCHOOL"."ID_SCHOOL"
            INNER JOIN "EPPM_PHONE" ON "EPPM_PHONE"."ID_PHONE" = "EPPT_PHONE_SCHOOL"."ID_PHONE"
            WHERE
                "EPPM_SCHOOL"."STATE" = '1'
                AND "EPPM_PHONE"."STATE" = '1';
        `;

        try {
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql);
            return { success: true, data: result.rows };
        } catch (error) {
            console.error("Error en getAll (SchoolPhone):", error);
            return { success: false, error: error.code || error.message };
        } finally {
            this.conn.disconnect();
        }
    }

    async deleteById(id) {
        const sql = `
            DELETE FROM PUBLIC."EPPT_PHONE_SCHOOL"
            WHERE "ID_PHONE_SCHOOL" = $1::INTEGER;
        `;
        const values = [id];

        try {
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, values);
            return { success: result.rowCount > 0 };
        } catch (error) {
            console.error("Error en deleteById (SchoolPhone):", error);
            return { success: false, error: error.code || error.message };
        } finally {
            this.conn.disconnect();
        }
    }

    async updateById(ID_SCHOOL, ID_PHONE, id) {
        const sql = `
            UPDATE PUBLIC."EPPT_PHONE_SCHOOL"
            SET "ID_SCHOOL" = $1::INTEGER, "ID_PHONE" = $2::INTEGER
            WHERE "ID_PHONE_SCHOOL" = $3::INTEGER;
        `;
        const values = [ID_SCHOOL, ID_PHONE, id];

        try {
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql, values);
            return { success: result.rowCount > 0 };
        } catch (error) {
            console.error("Error en updateById (SchoolPhone):", error);
            return { success: false, error: error.code || error.message };
        } finally {
            this.conn.disconnect();
        }
    }
}

module.exports = SchoolPhone;
