const searchRouter = require("express").Router();

const searchController = require("../controllers/searchController");
const checkToken = require('../helpers/checkToken')

searchRouter.get("/", searchController.searchRecipe);
module.exports = searchRouter;