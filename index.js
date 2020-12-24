require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const app = express();
const port = 8000
const db = require('./src/config/mySQL')
const mainRouter = require('./src/routes/index')
const cors = require('cors')

// listen port
app.listen(port, () => {
    console.log(`server running in port ${port}`);
})

//memperbolehkan akses dari semua origin
app.use(express.static('public'))

//use cors
app.use(cors())

// tambah logger
app.use(logger("dev"))

// body-parser untuk x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}))

// parser untuk raw json
app.use(express.json())

app.use('/', mainRouter)

module.exports = app