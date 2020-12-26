const userModel = require('../models/userModel')

module.exports = {
    userRecipes: (req, res) => {
        const id = req.decodedToken.id_user
        userModel.getUserRecipes(id)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })  
    },

    addLike: (req, res) => {
        const user_id = req.decodedToken.id_user;
        const { recipeId } = req.params;
        userModel
            .addLike(user_id, recipeId)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })
    },
    getLike: (req, res) => {
        const user_id = req.decodedToken.id_user;
        userModel
            .getLike(user_id)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })
    },
    checkLike:(req, res) => {
        const user_id = req.decodedToken.id_user
        const {recipeId} = req.params
        userModel.checkLike(user_id, recipeId)
        .then((result) => {
            res.json(result)
        }).catch((error) => {
            res.status(404).json(error)
        })
    },
    removeLike: (req, res) => {
        const user_id = req.decodedToken.id_user;
        const { recipeId } = req.params;
        userModel
            .removeLike(user_id, recipeId)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })
    },
    addBookmark: (req, res) => {
        const user_id = req.decodedToken.id_user;
        const { recipeId } = req.params;
        userModel
            .addBookmark(user_id, recipeId)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })
    },
    getBookmark: (req, res) => {
        const user_id = req.decodedToken.id_user;
        userModel
            .getBookmark(user_id)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })
    },
    checkBookmark:(req, res) => {
        const user_id = req.decodedToken.id_user
        const {recipeId} = req.params
        userModel.checkBookmark(user_id, recipeId)
        .then((result) => {
            res.json(result)
        }).catch((error) => {
            res.status(404).json(error)
        })
    },
    removeBookmark: (req, res) => {
        const user_id = req.decodedToken.id_user;
        const { recipeId } = req.params;
        userModel
            .removeBookmark(user_id, recipeId)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })
    },
    addComment: (req, res) => {
        const { recipeId } = req.params;
        const { comment } = req.body;
        const user_id = req.decodedToken.id_user;
        userModel
            .addComment(user_id, recipeId, comment)
            .then((result) => {
                res.status(result.status).json(result)
            }).catch((error) => {
                res.status(error.status).json(error)
            })
    },
}