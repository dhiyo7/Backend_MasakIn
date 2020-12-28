const express = require('express');
const mainRouter = express.Router()


const welcomeRouter = require ('./welcome')
const authRouter = require ('./authRouter')
const recipeRouter = require ('./recipeRouter')
const searchRouter = require("./searchRouter");
<<<<<<< HEAD
const userRouter = require ("./userRouter")
=======
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14

const checkToken = require('./../helpers/checkToken')

//MasakIn
mainRouter.use("/", welcomeRouter)
mainRouter.use("/auth", authRouter)
mainRouter.use("/recipe", recipeRouter) // localhost:8000/recipe
mainRouter.use("/search", searchRouter); // localhost:8000/search
<<<<<<< HEAD
mainRouter.use("/user", userRouter)
=======
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14


module.exports = mainRouter