const express = require('express')
const recipeController = require ('../controllers/recipeController')
const recipeRouter = express.Router()
const multiUpload = require("../helpers/upload");
// const uploadVideo = require("../helpers/uploadVideo")

recipeRouter.post('/add',  multiUpload , recipeController.addRecipe)

module.exports = recipeRouter