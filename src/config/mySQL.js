const mysql = require('mysql')
// koneksi ke db

<<<<<<< HEAD
const {HOST, DB_USER, DB_PASS, DB} = process.env
const db = mysql.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB
=======
const {MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE} = process.env
const db = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DATABASE
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
})

// cek koneksi ke db
db.connect((err) => {
    if (err) throw err;
    console.log('Database Connected');
})

module.exports = db