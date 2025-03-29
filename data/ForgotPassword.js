const ConnectionDB = require("./ConnectionDB");

class FacultyPhone {
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
                "EPPM_USER"."PASSWORD"
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
}

module.exports = FacultyPhone;
