const searchRouter = require("express").Router();

const searchController = require("../controllers/searchController");

searchRouter.get("/", searchController.searchRecipe);

module.exports = searchRouter;