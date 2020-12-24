const recipeModel = require("../models/recipeModel");
const fs = require('fs')
module.exports = {
  addRecipe: (req, res) => {
    // const { user_id } = req.decodedToken
    const image = req.files.img;
    const videos = req.files.videos;
    console.log(videos)

    insert_recipe = {
      id_user: req.decodedToken.id_user,
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

  //plan B
  b_addRecipe: (req, res) => {
    // const id_user = req.decodedToken.user_id
    const image = req.files.img;
    let imagePath = image.map((value) =>
      'public/images/' + value.filename
    )
    imagePath = imagePath.join(',')

    const videos = req.files.videos;
    let videosPath = videos.map((value) =>
      'public/videos/' + value.filename
    )
    videosPath = videosPath.join(',')

    insert_recipe = {
      id_user: req.decodedToken.id_user,
      img: imagePath,
      title: req.body.title,
      ingredients: req.body.ingredients,
      videos: videosPath
    };
    recipeModel.b_addRecipe(insert_recipe)
      .then((result) => {
        res.status(200).json({
          status: result.status,
          data: {
            ...insert_recipe,
            img: imagePath.split(','),
            videos: videosPath.split(',')
          }
        })
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  b_getAllRecipes: (req, res) => {
    recipeModel.b_getAllRecipes()
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  b_getRecipeId: (req, res) => {
    const { recipeId } = req.params
    console.log(recipeId)
    recipeModel.b_addView(recipeId).then(
      recipeModel.b_getRecipeId(recipeId)
      .then((result) => {
        
        res.status(result.status).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
    ).catch((err) => {
      console.log(err)
    })
    
  },
  b_getRecipeUser: (req, res) => {
    const userId = req.decodedToken.id_user
    recipeModel.b_getRecipeUser(userId)
      .then((result) => {
        res.status(result.status).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  b_updateRecipe: (req, res) => {
    const { recipeId } = req.params
    let updateData = req.body
    if (req.files.img) {
      const image = req.files.img;
      let imagePath = image.map((value) =>
        'public/images/' + value.filename
      )
      imagePath = imagePath.join(',')
      updateData = {
        ...updateData,
        img: imagePath
      }
      recipeModel.b_deleteImg(recipeId)
        .then((result) => {
          if (result[0] != '') {
            result[0].img.split(',').map((image) =>
              fs.unlink(`${image}`, (err) => {
                if (err) {
                  console.log(err)
                  return
                } else {
                  console.log(`${image} deleted`)
                }
              })
            )
          } else {
            console.log('Nothing to delete')
          }
        })
    }
    if (req.files.videos) {
      const videos = req.files.videos;
      let videosPath = videos.map((value) =>
        'public/videos/' + value.filename
      )
      videosPath = videosPath.join(',')
      updateData = {
        ...updateData,
        videos: videosPath
      }
      recipeModel.b_deleteVideo(recipeId)
        .then((result) => {
          if (result[0] != '') {
            result[0].videos.split(',').map((video) =>
              fs.unlink(`${video}`, (err) => {
                if (err) {
                  console.log(err)
                  return
                } else {
                  console.log(`${video} deleted`)
                }
              })
            )
          }
        })
    }
    recipeModel.b_updateRecipe(recipeId, updateData)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  b_deleteRecipe: (req, res) => {
    const { recipeId } = req.params
    recipeModel.b_deleteImg(recipeId)
      .then((result) => {
        if (result[0] != '') {
          result[0].img.split(',').map((image) =>
            fs.unlink(`${image}`, (err) => {
              if (err) {
                console.log(err)
                return
              } else {
                console.log(`${image} deleted`)
              }
            })
          )
        } else {
          console.log('Nothing to delete')
        }
      })
    recipeModel.b_deleteVideo(recipeId)
      .then((result) => {
        if (result[0] != '') {
          result[0].videos.split(',').map((video) =>
            fs.unlink(`${video}`, (err) => {
              if (err) {
                console.log(err)
                return
              } else {
                console.log(`${video} deleted`)
              }
            })
          )
        }
      })
    recipeModel.b_deleteRecipe(recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },

  //end of Plan B

  getAllRecipes: (req, res) => {
    recipeModel.getAllRecipes()
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  likeRecipe: (req, res) => {
    const user_id = req.decodedToken.id_user
    const { recipeId } = req.params
    recipeModel.addLike(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  getLikedRecipe: (req, res) => {
    const user_id = req.decodedToken.id_user
    recipeModel.getLikedRecipe(user_id)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })

  },
  unlikeFromDetail: (req, res) => { //unlike from detail recipe
    const user_id = req.decodedToken.id_user
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
    const user_id = req.decodedToken.id_user
    const { recipeId } = req.params
    recipeModel.addBookmark(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  getBookmarkedRecipe: (req, res) => {
    const user_id = req.decodedToken.id_user
    recipeModel.getBookmarkedRecipe(user_id)
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
  removeBookmarkFromDetail: (req, res) => {
    const user_id = req.decodedToken.id_user
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
    const user_id = req.decodedToken.id_user
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
};
