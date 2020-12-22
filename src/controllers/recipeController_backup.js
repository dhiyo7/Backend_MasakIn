const recipeModel = require ('./../models/recipeModel')

module.exports = {
    //all recipe
    getAllRecipes: (req, res) => {
        recipeModel.getAllRecipes()
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    getDetailRecipe: (req, res) => {
        const {id} = req.params
        recipeModel.getDetailRecipe(id)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    //like, comment, & bookmark
    likeRecipe: (req, res) => {
        const {user_id} = req.decodedToken
        const {id} = req.params
        recipeModel.likeRecipe(user_id,id)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    bookmarkRecipe: (req, res) => {
        const {user_id} = req.decodedToken
        const {id} = req.params
        recipeModel.bookmarkRecipe(user_id,id)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    commentRecipe: (req, res) => {
        const {user_id} = req.decodedToken
        const {id} = req.params
        const {comment} = req.body
        recipeModel.commentRecipe(user_id,id, comment)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    //my Recipe
    myRecipes: (req, res) => {
        const {user_id} = req.decodedToken
        recipeModel.myRecipes(user_id)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    likedRecipe:() => {
        const {user_id} = req.decodedToken
        recipeModel.likedRecipe(user_id)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    bookmarkedRecipe: () => {
        const {user_id} = req.decodedToken
        recipeModel.bookmarkedRecipe(user_id)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    //crud my recipe
    postNewRecipe: (req, res) => {
        console.log(req.fileImg, req.fileVid), req.body.title
        const {body} = req
        recipeModel.postNewRecipe(body)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    detailMyRecipe:(req, res) => {
        const {id} = req.params
        recipeModel.detailMyRecipe(id)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    updateRecipe: (req, res) => {
        const {id} = req.params
        const {body} = req
        recipeModel.updateRecipe(id, body)
        .then((result) => {
            result.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(error)
        })
    },
    deleteRecipes: (req, res) => {
        const {id} = req.params
        recipeModel.deleteRecipes(id)
        .then((result) => {
            res.status(200).json(result)
        }).catch((error) => {
            res.status(500).json(result)
        })
    }
}