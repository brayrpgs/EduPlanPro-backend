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
            //elimino el profesor
            const sql = `DELETE FROM public."EPPM_TEACHER"
                        WHERE "ID_TEACHER" = $1::integer
                        RETURNING "ID_PERSON";`;
            const stmt = await this.conn.connect();
            const values = [id];
            const result = await stmt.query(sql, values);
            const idPerson = result.rows[0].ID_PERSON;
            //ahora elimino la persona 
            const sql2 = `DELETE FROM public."EPPM_PERSON"
                            WHERE "ID_PERSON" = $1::integer;`;
            const values2 = [idPerson];
            const result2 = await stmt.query(sql2, values2);
            return result2.rows;
        } catch (error) {
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

    async updateById(id, name, secName, idcard, email, idUser, stat) {
        try {
            /**
             * actualizamos el profesor
             */
            const sql = `UPDATE PUBLIC."EPPM_TEACHER"
                        SET
                            "EMAIL" = $1::text,
                            "UPDATED_BY" = $2::integer,
                            "STATE" = $3::char,
                            "UPDATED_AT" = CURRENT_TIMESTAMP
                        WHERE
                            "ID_TEACHER" = $4::integer
                        RETURNING
                            "ID_PERSON"`;
            const stmt = await this.conn.connect();
            const values = [email, idUser, stat, id];
            const result = await stmt.query(sql, values);
            const idPerson = result.rows[0].ID_PERSON;
            /**
             * ahora la persona
             */
            const sql2 = `UPDATE PUBLIC."EPPM_PERSON"
                            SET
                                "DSC_NAME" = $1::text,
                                "DSC_SECOND_NAME" = $2::text,
                                "IDCARD" = $3::text,
                                "UPDATED_BY" = $4::integer,
                                "UPDATED_AT" = CURRENT_TIMESTAMP
                            WHERE
                                "ID_PERSON" = $5::integer`;
            const values2 = [name, secName, idcard, idUser, idPerson];
            const result2 = await stmt.query(sql2, values2);
            return result2.rows;
        } catch (error) {
            console.log(error);
            return false;
        }
        finally {
            this.conn.disconnect();
        }
    }

}
module.exports = Rol;