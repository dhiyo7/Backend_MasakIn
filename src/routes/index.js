const express = require('express');
const mainRouter = express.Router()

const authRouter = require ('./authRouter')

// const checkToken = require('./../helpers/checkToken')

//MasakIn

mainRouter.use("/auth", authRouter)


module.exports = mainRouter