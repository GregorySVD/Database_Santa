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
        this.giftId = obj.giftId;
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

    async update() {
        console.log('this.giftId', this.giftId);
        await pool.execute("UPDATE `children` SET `name` = :name, `giftId` = :giftId WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            giftId: this.giftId,
        });
    }

    async delete() {
        if (!this.id) {
            throw new ValidationError('Cannot delete child that does not exist');
        }
        await pool.execute("DELETE FROM `children` WHERE `id` = :id", {
            id: this.id,
        })
    }

    static async getOne(id) {
        const [results] = await pool.execute("SELECT * FROM `children` WHERE `id` = :id", {
            id,
        });
        return results.length === 0 ? null : new ChildRecord(results[0]); //result need to be returned as an object
        // typeof
        // ChildRecord
    }


    static async listAll() { //static method = function which operates on all records, not just one
        const [results] = await pool.execute('SELECT * FROM `children` ORDER BY `name` ASC');
        return results.map(obj => new ChildRecord(obj))
    }
}

module.exports = {
    ChildRecord,
}
