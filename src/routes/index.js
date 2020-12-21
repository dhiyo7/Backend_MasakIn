const express = require('express');
const mainRouter = express.Router()


const welcomeRouter = require ('./welcome')
const authRouter = require ('./authRouter')
const recipeRouter = require('./recipeRouter')

// const checkToken = require('./../helpers/checkToken')

//MasakIn
mainRouter.use("/", welcomeRouter)
mainRouter.use("/auth", authRouter)
mainRouter.use("/recipes", recipeRouter)


module.exports = mainRouter