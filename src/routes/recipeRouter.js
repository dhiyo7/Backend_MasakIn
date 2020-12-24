const express = require('express')
const recipeController = require ('../controllers/recipeController')
const recipeRouter = express.Router()
const multiUpload = require("../helpers/upload");

const checkToken = require ('./../helpers/checkToken')

recipeRouter.post('/add', multiUpload, recipeController.addRecipe)
recipeRouter.get ('/', recipeController.getAllRecipes)
// recipeRouter.delete('/delete/:recipeId', recipeController.deleteRecipe)

//plan B endpoint Recipe
recipeRouter.post('/b/add', multiUpload, recipeController.b_addRecipe)
recipeRouter.get('/b/myRecipe',checkToken.isLogin, recipeController.b_getRecipeUser)
recipeRouter.patch('/b/update/:recipeId',checkToken.isLogin, multiUpload, recipeController.b_updateRecipe)
recipeRouter.get ('/b/', recipeController.b_getAllRecipes)
recipeRouter.delete('/b/delete/:recipeId',checkToken.isLogin, recipeController.b_deleteRecipe)


//Like Recipe
recipeRouter.post('/b/like/:recipeId', checkToken.isLogin,recipeController.likeRecipe)
recipeRouter.get ('/b/likedRecipe', checkToken.isLogin, recipeController.getLikedRecipe)
//fromRecipe
recipeRouter.delete('/b/unlike/:recipeId',checkToken.isLogin, recipeController.unlikeFromDetail)
//fromList
recipeRouter.delete('/b/unlikeList/:likedId',checkToken.isLogin, recipeController.unlikeFromList)

//Bookmark Recipe
recipeRouter.post('/b/bookmark/:recipeId', checkToken.isLogin, recipeController.bookmarkRecipe)
recipeRouter.get ('/b/bookmarkedRecipe', checkToken.isLogin, recipeController.getBookmarkedRecipe)
//fromRecipe
recipeRouter.delete('/b/removeBookmark/:recipeId',checkToken.isLogin, recipeController.removeBookmarkFromDetail)
recipeRouter.delete('/b/removebookmarklist/:bookmarkId',checkToken.isLogin, recipeController.removeBookmarkFromList)

//Comment Recipe
recipeRouter.post('/b/addComment/:recipeId',checkToken.isLogin, recipeController.addComment)
recipeRouter.get('/b/comment/:recipeId', checkToken.isLogin, recipeController.getCommentRecipe)

recipeRouter.get('/b/:recipeId',checkToken.isLogin, recipeController.b_getRecipeId)




module.exports = recipeRouter