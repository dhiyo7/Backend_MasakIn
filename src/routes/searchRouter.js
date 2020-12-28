const searchRouter = require("express").Router();

const searchController = require("../controllers/searchController");
const checkToken = require('../helpers/checkToken')

searchRouter.get("/", searchController.searchRecipe);
<<<<<<< HEAD
=======
searchRouter.get("/new",searchController.new)
searchRouter.get("/popular",checkToken.isLogin, searchController.popular)
searchRouter.get("/mostViewed", searchController.mostViewed)

>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
module.exports = searchRouter;