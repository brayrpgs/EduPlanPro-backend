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

    async insert(name, secName, idcard, idUser, idRol, pass) {
        const client = await this.conn.connect();
        try {
            await client.query('BEGIN');
            const sql1 = `
                INSERT INTO PUBLIC."EPPM_PERSON" (
                    "DSC_NAME", "DSC_SECOND_NAME", "IDCARD", "UPDATED_BY"
                )
                VALUES ($1::text, $2::text, $3::text, $4::integer)
                RETURNING "ID_PERSON";
            `;
            const values = [name, secName, idcard, idUser];
            const Result1 = await client.query(sql1, values);
            const ID_PERSON = Result1.rows[0].ID_PERSON;

            // Insertar el usuario usando el ID_PERSON de la persona creada
            const sql2 = `INSERT INTO
                            PUBLIC."EPPM_USER" (
                                "ID_PERSON",
                                "ID_ROL",
                                "PASSWORD",
                                "UPDATED_BY"
                            )
                        VALUES
                            ($1::integer, $2::integer, $3::text, $4::integer);`;
            const encPass = await bcrypt.hash(pass, 10);
            const values2 = [ID_PERSON, idRol, encPass, idUser];
            await client.query(sql2, values2);
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
                            T1."ID_USER",
                            T2."DSC_NAME",
                            T2."DSC_SECOND_NAME",
                            T2."IDCARD",
                            T3."DSC_NAME",
                            T4."DSC_NAME"
                        FROM
                            PUBLIC."EPPM_USER" T1
                            INNER JOIN "EPPM_PERSON" T2 ON T2."ID_PERSON" = T1."ID_PERSON"
                            INNER JOIN "EPPM_ROL" T3 ON T3."ID_ROL" = T1."ID_ROL"
                            INNER JOIN "EPPM_PERSON" T4 ON T4."ID_PERSON" = T1."ID_PERSON"
                        WHERE
                            T1."STATE" = '1';`;
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