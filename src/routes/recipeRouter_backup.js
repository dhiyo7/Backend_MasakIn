const express = require('express')
const recipeController = require ('./../controllers/recipeController')
const recipeRouter = express.Router()
const uploadImg = require ('./../helpers/uploadImg')
const uploadVid = require ('./../helpers/uploadVId')


recipeRouter.get("/", recipeController.getAllRecipes)
recipeRouter.post("/addNewRecipe", uploadImg,uploadVid,recipeController.postNewRecipe)
//edit
recipeRouter.get("/:id", recipeController.getDetailRecipe)
recipeRouter.post("/addLike/:id", recipeController.likeRecipe)
//unlike
recipeRouter.post("/addBookmark/:id", recipeController.bookmarkRecipe)
//unbookmark
recipeRouter.post("/addComment/:id", recipeController.commentRecipe)

//butuh auth isLogin
recipeRouter.get("/myrecipes", recipeController.myRecipes)
recipeRouter.get("/myrecipes/like", recipeController.likedRecipe)
recipeRouter.get("/myrecipes/bookmark", recipeController.bookmarkedRecipe)
recipeRouter.get("/myrecipes/:id", recipeController.getDetailRecipe)
recipeRouter.delete("/myrecipes/archive/:id", recipeController.deleteRecipes)



module.exports = recipeRouter