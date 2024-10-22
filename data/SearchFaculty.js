const ConnectionDB = require("./ConnectionDB");

class SearchFaculty {
    constructor(parameters) {
        this.conn = new ConnectionDB();
    }

    async search(data) {
        try {
            const sql = ``;
            const stmt = await this.conn.connect();
            const values = [];
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
module.exports = SearchFaculty;