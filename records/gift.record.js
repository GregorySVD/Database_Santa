class GiftRecord {
    static listAll() { //static method = function which operates on all records, not just one
        return [
            {
                id: 'abc1',
                name: 'Doll',
                count: 5,
            },
            {
                id: 'abc2',
                name: 'Gun',
                count: 3,
            },
            {
                id: 'abc3',
                name: 'Car',
                count: 3,
            }
        ]
    }
}

module.exports = {
    GiftRecord,
}
