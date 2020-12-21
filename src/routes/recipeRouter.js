const express = require('express')
const recipeController = require ('../controllers/recipeController')
const recipeRouter = express.Router()
const multiUpload = require("../helpers/upload_old");

// const checkToken = require ('./../helpers/checkToken')

recipeRouter.post('/add', multiUpload, recipeController.addRecipe)
recipeRouter.get ('/', recipeController.getAllRecipes)
recipeRouter.delete('/delete/:recipeId', recipeController.deleteRecipe)

//Like Recipe
recipeRouter.post('/like/:recipeId', recipeController.likeRecipe)
recipeRouter.get ('/likedRecipe', recipeController.getLikedRecipe)
//fromRecipe
recipeRouter.delete('/unlike/:recipeId',recipeController.unlikeFromDetail)
//fromList
recipeRouter.delete('/unlikeList/:likedId',recipeController.unlikeFromList)

//Bookmark Recipe
recipeRouter.post('/bookmark/:recipeId', recipeController.bookmarkRecipe)
recipeRouter.get ('/bookmarkedRecipe', recipeController.getBookmarkedRecipe)
//fromRecipe
recipeRouter.delete('/removeBookmark/:recipeId',recipeController.removeBookmarkFromDetail)
recipeRouter.delete('/removebookmarklist/:bookmarkId',recipeController.removeBookmarkFromList)

//Comment Recipe
recipeRouter.post('/addComment/:recipeId',recipeController.addComment)
recipeRouter.get('/comment/:recipeId', recipeController.getCommentRecipe)




module.exports = recipeRouter