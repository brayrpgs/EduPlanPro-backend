const ConnectionDB = require("./ConnectionDB");

class Teacher {
    constructor(parameters) {
        this.conn = new ConnectionDB();
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
                            "EPPM_PERSON"."DSC_NAME" AS "Nombre",
                            "EPPM_PERSON"."DSC_SECOND_NAME" AS "Apellidos",
                            "EPPM_PERSON"."IDCARD" AS "Cedula",
                            "EPPM_TEACHER"."EMAIL" AS "Correo"
                        FROM
                            PUBLIC."EPPM_TEACHER"
                            INNER JOIN "EPPM_PERSON" ON "EPPM_PERSON"."ID_PERSON" = "EPPM_TEACHER"."ID_PERSON"`;
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
            const sql = `DELETE FROM public."EPPM_FACULTY"
	                    WHERE "ID_FACULTY" = $1::integer;`;
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

    async updateById(desc, user, stat, id) {
        try {
            const sql = `UPDATE PUBLIC."EPPM_FACULTY"
                        SET
                            "DSC_FACULTY" = $1::text,
                            "UPDATED_BY" = $2::integer,
                            "UPDATED_AT" = CURRENT_TIMESTAMP,
                            "STATE" = $3::char
                        WHERE
                            "ID_FACULTY" = $4::integer`;
            const stmt = await this.conn.connect();
            const values = [desc, user, stat, id];
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

module.exports = Teacher;