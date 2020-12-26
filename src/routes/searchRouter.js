const searchRouter = require("express").Router();

const searchController = require("../controllers/searchController");
const checkToken = require('../helpers/checkToken')

searchRouter.get("/", searchController.searchRecipe);
searchRouter.get("/new",searchController.new)
searchRouter.get("/popular",checkToken.isLogin, searchController.popular)
searchRouter.get("/mostViewed", searchController.mostViewed)

module.exports = searchRouter;