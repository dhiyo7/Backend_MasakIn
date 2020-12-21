const express = require('express');
const mainRouter = express.Router()

const authRouter = require ('./authRouter')
const recipeRouter = require ('./recipeRouter')

const checkToken = require('./../helpers/checkToken')

//MasakIn

mainRouter.use("/auth", authRouter)
mainRouter.use("/recipe",checkToken.isLogin, recipeRouter)


module.exports = mainRouter