const express = require('express')
const recipeController = require ('../controllers/recipeController')
const recipeRouter = express.Router()
const multiUpload = require("../helpers/upload");

const checkToken = require ('./../helpers/checkToken')

// hostname/recipe

recipeRouter.get ('/', recipeController.getAllRecipes)
recipeRouter.get('/newRecipe', recipeController.newRecipe)
recipeRouter.get('/video/:videoId',multiUpload, recipeController.getVideoById)
recipeRouter.get('/views', checkToken.checkLogin, recipeController.Popular); //popular
recipeRouter.get('/new', recipeController.newRecipe)
recipeRouter.get('/:recipeId', checkToken.isLogin , recipeController.getRecipeById) //perhatikan penempatan
recipeRouter.post('/add', checkToken.isLogin, multiUpload, recipeController.addRecipe)
recipeRouter.post('/video',multiUpload, recipeController.addVideo)
recipeRouter.put('/video/:videoId',multiUpload, recipeController.updateVideo)
recipeRouter.delete('/video/:videoId',multiUpload, recipeController.deleteVideo)
recipeRouter.get('/comment/:recipeId', checkToken.isLogin, recipeController.getCommentRecipe)
// recipeRouter.delete('/delete/:recipeId', recipeController.deleteRecipe)

module.exports = recipeRouter