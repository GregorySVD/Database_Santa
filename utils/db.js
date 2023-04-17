const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_santa_gifts',
    namedPlaceholders: true, // to accept data form user and make it safe
    decimalNumbers: true,
});


module.exports = {
    pool,
}
