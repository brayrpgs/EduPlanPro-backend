const ConnectionDB = require('./ConnectionDB');

class Rol {
    constructor() {
        this.conn = new ConnectionDB;
    }
    async insert(name, desc, idUser) {
        const client = await this.conn.connect();
        try {
            const sql = `INSERT INTO
                            PUBLIC."EPPM_ROL" (
                                "DSC_NAME",
                                "DSC_DESCRIPTION",
                                "UPDATED_BY"
                            )
                        VALUES
                            ($1::text, $2::text, $3::integer);`;
            const values = [name, desc, idUser];
            await client.query(sql, values);
            return true;
        } catch (error) {
            console.error('Error occurred:', error);
            return error.code;
        } finally {
            this.conn.disconnect();
        }
    }


    async getAll() {
        try {
            const sql = `SELECT
                            "EPPM_ROL"."ID_ROL",
                            "EPPM_ROL"."DSC_NAME" AS "NOMBRE",
                            "EPPM_ROL"."DSC_DESCRIPTION" AS "DESCRIPCION",
                            "EPPM_PERSON"."DSC_NAME" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_ROL"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_ROL"."UPDATED_BY"
                        WHERE
                            "EPPM_ROL"."STATE" = '1';`;
            const stmt = await this.conn.connect();
            const result = await stmt.query(sql);
            return result.rows;
        } catch (error) {
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async deleteById(id) {
        try {
            const sql = `DELETE FROM PUBLIC."EPPM_ROL"
                            WHERE
                                "ID_ROL" = $1::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [id];
            await stmt.query(sql, values);
            return true;
        } catch (error) {
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(DSC_NAME, DSC_DESCRIPTION, UPDATED_BY, STATE, ID_ROL) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_ROL"
                        SET
                            "DSC_NAME" = $1::TEXT,
                            "DSC_DESCRIPTION" = $2::TEXT,
                            "UPDATED_BY" = $3::INTEGER,
                            "UPDATED_AT" = CURRENT_TIMESTAMP,
                            "STATE" = $4::CHAR
                        WHERE
                            "ID_ROL" = $5::INTEGER;`;
            const stmt = await this.conn.connect();
            const values = [DSC_NAME, DSC_DESCRIPTION, UPDATED_BY, STATE, ID_ROL];
            await stmt.query(sql, values);
            return true;
        } catch (error) {
            console.error('Error occurred:', error);
            return error.code;
        }
        finally {
            this.conn.disconnect();
        }
    }

}
module.exports = Rol;