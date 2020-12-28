const mysql = require('mysql')
// koneksi ke db

const {HOST, DB_USER, DB_PASS, DB} = process.env
const db = mysql.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB
})

// cek koneksi ke db
db.connect((err) => {
    if (err) throw err;
    console.log('Database Connected');
})

module.exports = db