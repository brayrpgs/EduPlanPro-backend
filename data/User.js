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

            // Asegúrate de que se encontró un usuario
            if (res.rows.length === 0) {
                return false;  // No se encontró el usuario
            }

            const result = res.rows;  // Tomamos la primera fila

            // Comparar la contraseña usando bcrypt
            const passwordMatch = await bcrypt.compare(password, result[0].PASSWORD);

            if (passwordMatch) {
                return result;  // Contraseña coincide, devolver datos del usuario
            } else {
                return false;  // Contraseña no coincide
            }
        } catch (e) {
            console.error(e);
            return false;  // En caso de error, devolver falso
        } finally {
            if (user) {
                await this.conn.disconnect();  // Desconectar si la conexión es válida
            }
        }
    }



}
module.exports = User;