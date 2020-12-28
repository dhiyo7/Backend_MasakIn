const express = require('express')
const recipeController = require ('../controllers/recipeController')
const recipeRouter = express.Router()
const multiUpload = require("../helpers/upload");

const checkToken = require ('./../helpers/checkToken')

// hostname/recipe

recipeRouter.get ('/', recipeController.getAllRecipes)
recipeRouter.get('/video/:videoId',multiUpload, recipeController.getVideoById)
recipeRouter.get('/views', checkToken.checkLogin, recipeController.Popular); //popular
recipeRouter.get('/new', recipeController.newRecipe)
recipeRouter.get('/:recipeId', checkToken.isLogin , recipeController.getRecipeById) //perhatikan penempatan
recipeRouter.post('/add', checkToken.isLogin, multiUpload, recipeController.addRecipe)
recipeRouter.patch('/update/:recipeId', checkToken.isLogin, multiUpload, recipeController.updateRecipe)
recipeRouter.delete('/delete/:recipeId', checkToken.isLogin, recipeController.deleteRecipe)

//update delete video
recipeRouter.post('/video/:recipeId', checkToken.isLogin, multiUpload, recipeController.addVideo)
recipeRouter.put('/video/:videoId', checkToken.isLogin, multiUpload, recipeController.updateVideo)
recipeRouter.delete('/video/:videoId', checkToken.isLogin, recipeController.deleteVideo)

recipeRouter.get('/comment/:recipeId', checkToken.isLogin, recipeController.getCommentRecipe)
// recipeRouter.delete('/delete/:recipeId', recipeController.deleteRecipe)

module.exports = recipeRouter