const bcrypt = require('bcrypt');
const ConnectionDB = require('./ConnectionDB');
const validateFields = require('../services/validateFields');

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
        if (!validateFields(name, "string") || !validateFields(secName, "string") || !validateFields(idUser, "number") || !validateFields(idRol, "number")) {
            return undefined;
        };
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
                            T2."DSC_NAME" AS "NOMBRE",
                            T2."DSC_SECOND_NAME" AS "APELLIDOS",
                            T2."IDCARD" AS "IDENTIFICACION",
                            T3."DSC_NAME" AS "ROL",
                            T4."DSC_NAME" AS "ACTUALIZADO POR"
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
            const sql = `DELETE FROM PUBLIC."EPPM_USER"
                        WHERE
                            "ID_USER" = $1::integer
                        RETURNING
                            "ID_USER"`;
            const stmt = await this.conn.connect();
            const values = [id];
            const result = await stmt.query(sql, values);
            const idUser = result.rows[0].ID_PERSON;
            //ahora elimino la persona 
            const sql2 = `DELETE FROM PUBLIC."EPPP_PREFERENCES"
                            WHERE
                                "ID_USER" = $1::integer;`;
            const values2 = [idUser];
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

    async updateById(id, name, secName, idcard, idRol, pass, idUser, stat, flagPass) {
        const stmt = await this.conn.connect(); // Conectar una vez
        try {
            const encPass = flagPass ? await bcrypt.hash(pass, 10) : null;
            const sql1 = `UPDATE PUBLIC."EPPM_PERSON"
                      SET
                          "DSC_NAME" = $1::text,
                          "DSC_SECOND_NAME" = $2::text,
                          "IDCARD" = $3::text,
                          "UPDATED_BY" = $4::integer,
                          "UPDATED_AT" = CURRENT_TIMESTAMP
                      WHERE
                          "ID_PERSON" = (
                              SELECT
                                  "ID_PERSON"
                              FROM
                                  "EPPM_USER"
                              WHERE
                                  "ID_USER" = $5::integer
                          )`;

            const values1 = [name, secName, idcard, idUser, id];
            await stmt.query(sql1, values1);

            // Construcción dinámica de la segunda sentencia UPDATE
            let sql2 = `UPDATE PUBLIC."EPPM_USER"
                      SET
                          "ID_ROL" = $1::integer,`;
            const values2 = [idRol];
            if (flagPass) {
                sql2 += `"PASSWORD" = $2::text, `;
                values2.push(encPass); // Añadir la contraseña encriptada a values2
            }
            sql2 += `"UPDATED_BY" = $${values2.length + 1}::integer,
                          "UPDATED_AT" = CURRENT_TIMESTAMP,
                          "CREATED_AT" = CURRENT_TIMESTAMP,
                          "STATE" = $${values2.length + 2}::char
                      WHERE
                          "ID_USER" = $${values2.length + 3}::integer`;
            values2.push(idUser, stat, id);
            await stmt.query(sql2, values2);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.conn.disconnect()
        }
    }


}
module.exports = User;