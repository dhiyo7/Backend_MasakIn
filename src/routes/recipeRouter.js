const express = require('express')
const recipeController = require ('../controllers/recipeController')
const recipeRouter = express.Router()
const multiUpload = require("../helpers/upload_old");

const checkToken = require ('./../helpers/checkToken')

recipeRouter.post('/add', multiUpload, recipeController.addRecipe)
recipeRouter.get ('/', recipeController.getAllRecipes)
// recipeRouter.delete('/delete/:recipeId', recipeController.deleteRecipe)

//plan B endpoint Recipe
recipeRouter.post('/b/add',checkToken.isLogin, multiUpload, recipeController.b_addRecipe)
recipeRouter.get('/b/myRecipe',checkToken.isLogin, recipeController.b_getRecipeUser)
recipeRouter.patch('/b/updateRecipe/:recipeId',checkToken.isLogin, multiUpload, recipeController.b_updateRecipe)
recipeRouter.get ('/b/', recipeController.b_getAllRecipes)
recipeRouter.get('/b/:recipeId',checkToken.isLogin, recipeController.b_getRecipeId)
recipeRouter.delete('/b/delete/:recipeId',checkToken.isLogin, recipeController.b_deleteRecipe)


//Like Recipe
recipeRouter.post('/b/like/:recipeId', recipeController.likeRecipe)
recipeRouter.get ('/b/likedRecipe', recipeController.getLikedRecipe)
//fromRecipe
recipeRouter.delete('/b/unlike/:recipeId',recipeController.unlikeFromDetail)
//fromList
recipeRouter.delete('/b/unlikeList/:likedId',recipeController.unlikeFromList)

//Bookmark Recipe
recipeRouter.post('/b/bookmark/:recipeId', recipeController.bookmarkRecipe)
recipeRouter.get ('/b/bookmarkedRecipe', recipeController.getBookmarkedRecipe)
//fromRecipe
recipeRouter.delete('/b/removeBookmark/:recipeId',recipeController.removeBookmarkFromDetail)
recipeRouter.delete('/b/removebookmarklist/:bookmarkId',recipeController.removeBookmarkFromList)

//Comment Recipe
recipeRouter.post('/b/addComment/:recipeId',recipeController.addComment)
recipeRouter.get('/b/comment/:recipeId', recipeController.getCommentRecipe)




module.exports = recipeRouter