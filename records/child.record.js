const {pool} = require("../utils/db");
const {ValidationError} = require("../utils/errors");
const {v4: uuid} = require("uuid");

class ChildRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError('Name of child has to be between 3 and 25 characters')
        }

        this.id = obj.id;
        this.name = obj.name;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute('INSERT INTO `children`(`id`,`name`) VALUES (:id, :name)', {
            id: this.id,
            name: this.name,
        });
        return this.id;
    }


    static async listAll() { //static method = function which operates on all records, not just one
        const [results] = await pool.execute('SELECT * FROM `children` ORDER BY `name` ASC');
        return results;
    }
}

module.exports = {
    ChildRecord,
}
