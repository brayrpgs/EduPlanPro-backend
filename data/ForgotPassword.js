const ConnectionDB = require("./ConnectionDB");
const bcrypt = require('bcrypt');

class ForgotPassword {
  constructor(parameters) {
    this.conn = new ConnectionDB();
  }

  async getUserWithPassword(question1, question2, question3) {
    try {
      const sql = `
            SELECT
                "EPPM_PERSON"."DSC_NAME",
                "EPPM_PERSON"."DSC_SECOND_NAME",
                "EPPM_PERSON"."IDCARD",
                "EPPM_USER"."PASSWORD",
                "EPPM_USER"."ID_USER"
            FROM
                PUBLIC."EPPM_USER"
            INNER JOIN "EPPM_PERSON" 
                ON "EPPM_USER"."ID_PERSON" = "EPPM_PERSON"."ID_PERSON"
            WHERE
                "EPPM_USER"."ID_ROL" <> 1
                AND "EPPM_PERSON"."STATE" <> '0'
                AND "EPPM_USER"."STATE" <> '0'
                AND "EPPM_PERSON"."DSC_NAME" ILIKE $1
                AND "EPPM_PERSON"."DSC_SECOND_NAME" ILIKE $2
                AND "EPPM_PERSON"."IDCARD" ILIKE $3
            ORDER BY
                "EPPM_USER"."ID_USER" ASC
            LIMIT 1;
        `;

      const stmt = await this.conn.connect();
      const values = [question1, question2, question3];

      const result = await stmt.query(sql, values);
      return result.rows;
    } catch (error) {
      return error.code;
    } finally {
      this.conn.disconnect();
    }
  }

  async updatePassword(user) {
    try {
      const encPass = await bcrypt.hash(user.newPassword, 10);

      const sql = `
            UPDATE PUBLIC."EPPM_USER"
            SET
              "PASSWORD" = $1,
              "UPDATED_BY" = $2,
              "UPDATED_AT" = CURRENT_TIMESTAMP
            WHERE
              "ID_USER" = $2
        `;

      const stmt = await this.conn.connect();
      const values = [encPass, user.ID_USER];

      await stmt.query(sql, values);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      this.conn.disconnect();
    }
  }
}

module.exports = ForgotPassword;
