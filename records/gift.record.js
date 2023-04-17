const {pool} = require("../utils/db");
const {ValidationError} = require("../utils/errors");
const {v4: uuid} = require("uuid");

class GiftRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
            throw new ValidationError('Name of gift has to be between 3 and 55 characters')
        }
        if (!obj.count || obj.count < 1 || obj.count > 999999) {
            throw new ValidationError('Count of gift has to be between 1 and 999999 characters and must be integer' +
                ' number ')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.count = obj.count;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `gifts` VALUES (:id, :name, :count)', {
            id: this.id,
            name: this.name,
            count: this.count,
        });
        return this.id;
    }

    static async listAll() { //static method = function which operates on all records, not just one
        const [results] = await pool.execute('SELECT * FROM `gifts`');
        return results;
    }
}

module.exports = {
    GiftRecord,
}
