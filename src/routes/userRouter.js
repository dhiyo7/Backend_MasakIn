const userRouter = require("express").Router();
const userController = require ('../controllers/userController')
const checkToken = require ('../helpers/checkToken');

// Profile
userRouter.get('/myrecipe', checkToken.isLogin, userController.userRecipes)
userRouter.post('/addLike/:recipeId', checkToken.isLogin, userController.addLike)
userRouter.get('/getLike', checkToken.isLogin, userController.getLike)
userRouter.get('/checkLike/:recipeId', checkToken.isLogin, userController.checkLike)
userRouter.delete('/removeLike/:recipeId', checkToken.isLogin, userController.removeLike)
userRouter.post('/addBookmark/:recipeId', checkToken.isLogin, userController.addBookmark)
userRouter.get('/getBookmark', checkToken.isLogin,  userController.getBookmark)
userRouter.get('/checkBookmark/:recipeId', checkToken.isLogin, userController.checkBookmark)
userRouter.delete('/removeBookmark/:recipeId', checkToken.isLogin, userController.removeBookmark)
userRouter.post('/addComment/:recipeId', checkToken.isLogin, userController.addComment)


module.exports = userRouter  