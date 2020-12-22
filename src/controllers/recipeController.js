// Punya mas moko

// const recipeModel = require('../models/recipeModel')

// module.exports = {
//     addRecipe: (req, res) => {
//         let insert_recipe = req.body
//         // const { user_id } = req.decodedToken
//         insert_recipe = {
//             ...insert_recipe,
//             // user_id,
//             img: req.filePath
//         }
//         const image = req.filePath.split(',')
//         recipeModel.addRecipe(insert_recipe)
//             .then((data) => {
//                 // form.success(res, {
//                 //     ...insert_recipe,
//                 //     img: image
//                 // })
//                 res.status(200).json({...insert_recipe,
//                     img: image})
//             }).catch((err) => {
//                 // form.error(res, err)
//                 res.status(500).json(err)
//             })
//     },
// }

const recipeModel = require("../models/recipeModel");
// const { deleteRecipe } = require("../models/recipeModel_backup");
module.exports = {
  addRecipe: (req, res) => {
    // const { user_id } = req.decodedToken
    const image = req.files.img;
    const videos = req.files.videos;
    console.log(videos)

    insert_recipe = {
      id_user: 1,
      img: image.map((res) => res.path),
      title: req.body.title,
      ingredients: req.body.ingredients,
    };

    recipeModel
      .addRecipe(insert_recipe, videos)
      .then((data) => {
        const successAdd = {
          msg: "Recipe added successfully",
          data: { ...insert_recipe, videos: videos.map((res) => res.path) },
        };

        res.json(successAdd);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAllRecipes: (req, res) => {
    recipeModel.getAllRecipes()
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  likeRecipe: (req, res) => {
    const user_id = 1 //user_id
    const { recipeId } = req.params
    recipeModel.addLike(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  getLikedRecipe: (req, res) => {
    const user_id = 1
    recipeModel.getLikedRecipe(user_id)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })

  },
  unlikeFromDetail: (req, res) => { //unlike from detail recipe
    const user_id = 1
    const { recipeId } = req.params
    recipeModel.unlikeFromDetail(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  unlikeFromList: (req, res) => {
    const { likedId } = req.params
    recipeModel.unlikeFromList(likedId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  bookmarkRecipe: (req, res) => {
    const user_id = 1 //user_id
    const { recipeId } = req.params
    recipeModel.addBookmark(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  getBookmarkedRecipe: (req, res) => {
    const user_id = 1
    recipeModel.getBookmarkedRecipe(user_id)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  removeBookmarkFromDetail: (req, res) => {
    const user_id = 1
    const { recipeId } = req.params
    recipeModel.removeBookmarkFromDetail(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  removeBookmarkFromList: (req, res) => {
    const { bookmarkId } = req.params
    recipeModel.removeBookmarkFromList(bookmarkId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  addComment: (req, res) => {
    const { recipeId } = req.params
    const { comment } = req.body
    const user_id = 4
    recipeModel.addComment(user_id, recipeId, comment)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  getCommentRecipe: (req, res) => {
    const { recipeId } = req.params
    recipeModel.getRecipeComment(recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  deleteRecipe: (req, res) => {
    const {recipeId} = req.params
    recipeModel.deleteRecipe(recipeId)
    .then((result) => {
      res.status(200).json(result)
    }).catch((error) => {
      res.status(500).json(error)
    })
  }
};
