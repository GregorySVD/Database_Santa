const {pool} = require("../utils/db");

class GiftRecord {
    static async listAll() { //static method = function which operates on all records, not just one
        const [results] = await pool.execute('SELECT * FROM `gifts`');
        return results;
    }
}

module.exports = {
    GiftRecord,
}
