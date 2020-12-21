const express = require('express');
const mainRouter = express.Router()

const authRouter = require ('./authRouter')
const welcomeRouter = require ('./welcome')

// const checkToken = require('./../helpers/checkToken')

//MasakIn
mainRouter.use("/", welcomeRouter)
mainRouter.use("/auth", authRouter)


module.exports = mainRouter