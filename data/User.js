const bcrypt = require('bcrypt');
const ConnectionDB = require('./ConnectionDB');

class User {
    constructor() {
        this.conn = new ConnectionDB;
    }
    async validateUser(idcard, password) {
        let user;
        try {
            user = await this.conn.connect();  // Conexión a la base de datos
            const values = [idcard];
            const sql = `
                SELECT
                    "EPPM_PERSON"."DSC_NAME",
                    "EPPM_PERSON"."DSC_SECOND_NAME",
                    "EPPM_PERSON"."IDCARD",
                    "EPPM_ROL"."DSC_NAME" AS "ROLE_NAME",
                    "EPPM_USER"."ID_USER",
                    "EPPM_USER"."PASSWORD"
                FROM
                    PUBLIC."EPPM_USER"
                INNER JOIN PUBLIC."EPPM_ROL" ON "EPPM_ROL"."ID_ROL" = "EPPM_USER"."ID_ROL"
                INNER JOIN PUBLIC."EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                WHERE
                    "EPPM_PERSON"."IDCARD" = $1::text;
            `;
            const res = await user.query(sql, values);
            if (res.rows.length === 0) {
                return false;
            }
            const result = res.rows;
            const passwordMatch = await bcrypt.compare(password, result[0].PASSWORD);

            if (passwordMatch) {
                return result;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        } finally {
            if (user) {
                await this.conn.disconnect();
            }
        }
    }

    async insert(name, secName, idcard, idUser, email) {
        const client = await this.conn.connect();
        try {
            await client.query('BEGIN');

            // Insertar persona
            const insertPersonQuery = `
                INSERT INTO PUBLIC."EPPM_PERSON" (
                    "DSC_NAME", "DSC_SECOND_NAME", "IDCARD", "UPDATED_BY"
                )
                VALUES ($1::text, $2::text, $3::text, $4::integer)
                RETURNING "ID_PERSON";
            `;
            const personResult = await client.query(insertPersonQuery, [name, secName, idcard, idUser]);
            const personId = personResult.rows[0].ID_PERSON;

            // Insertar profesor usando el ID de la persona creada
            const insertTeacherQuery = `
                INSERT INTO PUBLIC."EPPM_TEACHER" ("ID_PERSON", "EMAIL", "UPDATED_BY")
                VALUES ($1::integer, $2::text, $3::integer);
            `;
            await client.query(insertTeacherQuery, [personId, email, idUser]);

            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error occurred:', error);
            return false;
        } finally {
            this.conn.disconnect();
        }
    }


    async getAll() {
        try {
            const sql = `SELECT
                            "EPPM_TEACHER"."ID_TEACHER",
                            "EPPM_PERSON"."DSC_NAME" AS "NOMBRE",
                            "EPPM_PERSON"."DSC_SECOND_NAME" AS "APELLIDOS",
                            "EPPM_PERSON"."IDCARD" AS "CEDULA",
                            "EPPM_TEACHER"."EMAIL" AS "CORREO",
                            "EPPM_PERSON2"."DSC_NAME" AS "ACTUALIZADO POR"
                        FROM
                            PUBLIC."EPPM_TEACHER"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"
                            INNER JOIN "EPPM_USER" ON "EPPM_USER"."ID_PERSON" = "EPPM_PERSON"."UPDATED_BY"
                            INNER JOIN "EPPM_PERSON" "EPPM_PERSON2" ON "EPPM_PERSON2"."ID_PERSON" = "EPPM_USER"."ID_PERSON"
                            WHERE 
                            "EPPM_TEACHER"."STATE" = '1'`;
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
module.exports = User;