class ChildRecord {
    static listAll() { //static method = function which operates on all records, not just one
        return [
            {
                id: 'abcd',
                name: 'Adam',
                gift: 'Doll'
            },
            {
                id: '12312rasff',
                name: 'Gosia',
                gift: 'Gun'
            },
            {
                id: 'ab124ascd',
                name: 'Grzegorz',
                gift: 'Car'
            },
            {
                id: 'a1sabc21312d',
                name: 'Kuba',
                gift: 'Doll'
            },
            {
                id: 'abasdfa12cd',
                name: 'Zenek',
                gift: 'Car'
            }
        ]
    }
}

module.exports = {
    ChildRecord,
}
