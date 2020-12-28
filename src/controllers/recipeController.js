const recipeModel = require("../models/recipeModel");
const fs = require("fs");
module.exports = {
  addRecipe: (req, res) => {
<<<<<<< HEAD
    const image = req.files.img;
    const videos = req.files.videos;
    console.log(videos);
    insert_recipe = {
      id_user: req.decodedToken.id_user,
      img: image.map((res) => '/images/' + res.filename),
      title: req.body.title,
      ingredients: req.body.ingredients,
      views: 0
=======
    // const { user_id } = req.decodedToken
    const image = req.files.img;
    const videos = req.files.videos;
    console.log(videos);

    insert_recipe = {
      id_user: req.decodedToken.id_user,
      img: image.map((res) => res.path),
      title: req.body.title,
      ingredients: req.body.ingredients,
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
    };

    recipeModel
      .addRecipe(insert_recipe, videos)
      .then((data) => {
        const successAdd = {
          msg: "Recipe added successfully",
<<<<<<< HEAD
          id:data.insertId,
          data: { ...insert_recipe, videos: videos.map((res) => '/videos/' + res.filename) },
        };
=======
          data: { ...insert_recipe, videos: videos.map((res) => res.path) },
        };

>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
        res.json(successAdd);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

<<<<<<< HEAD
  getAllRecipes: (req, res) => {
    recipeModel
      .getAllRecipes()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

=======
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
  getRecipeById: (req, res) => {
    const { recipeId } = req.params;
    Promise.all([
      recipeModel.getRecipeVideoByIDRecipe(recipeId),
      recipeModel.getRecipeById(recipeId),
    ])
      .then((result) => {
        const finalResult = result[1].data;
        const videos = result[0].data;
        if (!finalResult || !videos)
          return res.status(404).json({ msg: "Recipe not found" });
        finalResult.videos = videos;
        res.status(200).json({
          msg: "Data Recipe successfully",
          status: 200,
          data: finalResult,
        });
      })
      .catch((err) => res.status(500).json({ msg: err.message }));
  },

<<<<<<< HEAD
  updateRecipe: (req, res) => {
    const { recipeId } = req.params
    let { body } = req
    if (req.files.img === undefined) {
      console.log('tidak ada gambar')
    } else {
      body = {
        ...body,
        img: '/images/' + req.files.img[0].filename
      }
    }
    recipeModel.updateRecipe(recipeId, body)
      .then((result) => {
        res.status(result.status).json({
          ...result,
          body
        })
      }).catch((error) => {
        res.json(error.status).json(error)
      })
  },

  deleteRecipe: (req, res) => {
    const { recipeId } = req.params
    Promise.all([
      recipeModel.getImgToDelete(recipeId),
      recipeModel.getVideoToDelete(recipeId),
      recipeModel.deleteTblVideo(recipeId),
      recipeModel.deleteRecipe(recipeId)
    ])
      .then((result) => {
        const delImg = result[0].imgToDel[0]
        const delVideo = result[1].videoToDel
        if (result[3]) {
          if (delImg) {
            console.log(delImg)
            fs.unlink(`./public${delImg.img}`, (err) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.log(`${delImg.img} deleted`);
              }
            });
          }
        }
        if (result[2]) {
          if (delVideo) {
            console.log(delVideo)
            delVideo.map((video) => {
              fs.unlink(`./public${video.video_file}`, (err) => {
                if (err) {
                  console.log(err);
                  return; 
                } else {
                  console.log(`${video.video_file} deleted`);
                }
              });
            })
          }
        }
        res.status(200).json({
          message: `berhasil dihapus`
        })  
      }).catch((error) => {
        res.status(500).json(error)
      })
  },

  getCommentRecipe: (req, res) => {
    const { recipeId } = req.params;
    recipeModel
      .getRecipeComment(recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

=======
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
  getVideoById: (req, res) => {
    const { videoId } = req.params;
    recipeModel
      .getRecipeVideoById(videoId)
      .then((result) => {
        res.status(200).json(result.data[0]);
      })
      .catch((error) => {
<<<<<<< HEAD
=======
        console.log(error);
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
        res.status(500).json(error);
      });
  },

<<<<<<< HEAD
  //tested
  addVideo: (req, res) => {
    const { recipeId } = req.params
    let bodyVideo;
    if (req.files.videos === undefined) { //cannot read property of undefined
      res.status(500).json("videos required");
    } else {
      const videos = req.files.videos;
      bodyVideo = {
        recipe_id: recipeId,
        video_title: videos[0].originalname.split('.')[0],
        video_file: '/videos/' + videos[0].filename
      }
    }
    recipeModel
      .addRecipeVideo(bodyVideo)
      .then((result) => {
        res.status(200).json({
          message: `sukses menambahkan video baru`,
          data: bodyVideo
        });
=======
  addVideo: (req, res) => {
    const params = req.body;
    console.log(params);
    const videos = req.files.videos;
    if (videos) {
      params.video_file = videos[0].path;
    } else {
      res.status(500).json("videos required");
    }
    recipeModel
      .addRecipeVideo(params)
      .then((result) => {
        res.status(200).json(result);
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

<<<<<<< HEAD
  //tested
  updateVideo: (req, res) => {
    const { videoId } = req.params;
    const videos = req.files.videos;
    let bodyUpdate;
    if (videos) {
      bodyUpdate = {
        ...bodyUpdate,
        video_title: videos[0].originalname.split('.')[0],
        video_file: '/videos/' + videos[0].filename
      }
    }
    Promise.all([
      recipeModel.getRecipeVideoById(videoId),
      recipeModel.updateRecipeVideo(bodyUpdate, videoId),
=======
  updateVideo: (req, res) => {
    const params = req.body;
    const { videoId } = req.params;
    console.log(params);
    const videos = req.files.videos;
    if (videos) {
      params.video_file = videos[0].path;
    }
    Promise.all([
      recipeModel.getRecipeVideoById(videoId),
      recipeModel.updateRecipeVideo(params, videoId),
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
    ])
      .then((result) => {
        const oldVideos = result[0].data[0];
        if (videos) {
<<<<<<< HEAD
          if (bodyUpdate.video_file !== oldVideos.video_file) {
            fs.unlink(`./public${oldVideos.video_file}`, (err) => {
=======
          if (params.video_file !== oldVideos.video_file) {
            fs.unlink(`${oldVideos.video_file}`, (err) => {
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
              if (err) {
                console.log(err);
                return;
              } else {
                console.log(`${oldVideos.video_file} deleted`);
              }
            });
          }
        }
        if (!oldVideos) return res.status(404).json("data not found");

<<<<<<< HEAD
        res.status(200).json(bodyUpdate);
=======
        res.status(200).json(params);
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

<<<<<<< HEAD
  //tested
  deleteVideo: (req, res) => {
    const { videoId } = req.params;
=======
  deleteVideo: (req, res) => {
    const params = req.body;
    const { videoId } = req.params;
    console.log(params);
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
    Promise.all([
      recipeModel.getRecipeVideoById(videoId),
      recipeModel.deleteVideo(videoId),
    ])
      .then((result) => {
        const videos = result[0].data[0];
        const deleteVideos = result[1];
        if (!videos) return res.status(404).json("data not found");
<<<<<<< HEAD
        if (videos) {
          if (deleteVideos) {
            fs.unlink(`./public${videos.video_file}`, (err) => {
=======

        if (videos) {
          if (deleteVideos) {
            fs.unlink(`${videos.video_file}`, (err) => {
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
              if (err) {
                console.log(err);
                return;
              } else {
<<<<<<< HEAD
                console.log(`./public${videos.video_file} deleted`);
=======
                console.log(`${videos.video_file} deleted`);
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
              }
            });
          }
        }

<<<<<<< HEAD
        res.status(200).json({
          message: `${videos.video_title} deleted`,
          pathDeleted: videos.video_file
        });
=======
        res.status(200).json(videoId);
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

<<<<<<< HEAD
  //end of CRUD Recipe

  // Popular
  Popular: (req, res) => {
    const decodeToken = req.decodedToken;
    // console.log(req);
    recipeModel
      .Popular(decodeToken)
=======
  //plan B
  b_addRecipe: (req, res) => {
    // const id_user = req.decodedToken.user_id
    const image = req.files.img;
    let imagePath = image.map((value) => "public/images/" + value.filename);
    imagePath = imagePath.join(",");

    const videos = req.files.videos;
    let videosPath = videos.map((value) => "public/videos/" + value.filename);
    videosPath = videosPath.join(",");

    insert_recipe = {
      id_user: req.decodedToken.id_user,
      img: imagePath,
      title: req.body.title,
      ingredients: req.body.ingredients,
      videos: videosPath,
    };
    recipeModel
      .b_addRecipe(insert_recipe)
      .then((result) => {
        res.status(200).json({
          status: result.status,
          data: {
            ...insert_recipe,
            img: imagePath.split(","),
            videos: videosPath.split(","),
          },
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  b_getAllRecipes: (req, res) => {
    recipeModel
      .b_getAllRecipes()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  b_getRecipeId: (req, res) => {
    const { recipeId } = req.params;
    console.log(recipeId);
    recipeModel
      .b_addView(recipeId)
      .then(
        recipeModel
          .b_getRecipeId(recipeId)
          .then((result) => {
            res.status(result.status).json(result);
          })
          .catch((error) => {
            res.status(500).json(error);
          })
      )
      .catch((err) => {
        console.log(err);
      });
  },
  b_getRecipeUser: (req, res) => {
    const userId = req.decodedToken.id_user;
    recipeModel
      .b_getRecipeUser(userId)
      .then((result) => {
        res.status(result.status).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  b_updateRecipe: (req, res) => {
    const { recipeId } = req.params;
    let updateData = req.body;
    if (req.files.img) {
      const image = req.files.img;
      let imagePath = image.map((value) => "public/images/" + value.filename);
      imagePath = imagePath.join(",");
      updateData = {
        ...updateData,
        img: imagePath,
      };
      recipeModel.b_deleteImg(recipeId).then((result) => {
        if (result[0] != "") {
          result[0].img.split(",").map((image) =>
            fs.unlink(`${image}`, (err) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.log(`${image} deleted`);
              }
            })
          );
        } else {
          console.log("Nothing to delete");
        }
      });
    }
    if (req.files.videos) {
      const videos = req.files.videos;
      let videosPath = videos.map((value) => "public/videos/" + value.filename);
      videosPath = videosPath.join(",");
      updateData = {
        ...updateData,
        videos: videosPath,
      };
      recipeModel.b_deleteVideo(recipeId).then((result) => {
        if (result[0] != "") {
          result[0].videos.split(",").map((video) =>
            fs.unlink(`${video}`, (err) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.log(`${video} deleted`);
              }
            })
          );
        }
      });
    }
    recipeModel
      .b_updateRecipe(recipeId, updateData)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  b_deleteRecipe: (req, res) => {
    const { recipeId } = req.params;
    recipeModel.b_deleteImg(recipeId).then((result) => {
      if (result[0] != "") {
        result[0].img.split(",").map((image) =>
          fs.unlink(`${image}`, (err) => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log(`${image} deleted`);
            }
          })
        );
      } else {
        console.log("Nothing to delete");
      }
    });
    recipeModel.b_deleteVideo(recipeId).then((result) => {
      if (result[0] != "") {
        result[0].videos.split(",").map((video) =>
          fs.unlink(`${video}`, (err) => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log(`${video} deleted`);
            }
          })
        );
      }
    });
    recipeModel
      .b_deleteRecipe(recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  // Popular
  b_getRecipeByViews: (req, res) => {
    const decodeTOken = req.decodedToken;
    recipeModel
      .b_getRecipeByViews(decodeTOken)
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
<<<<<<< HEAD
  newRecipe: (req, res) => {
    recipeModel.Newest()
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
=======

  //end of Plan B

  getAllRecipes: (req, res) => {
    recipeModel
      .getAllRecipes()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  likeRecipe: (req, res) => {
    const user_id = req.decodedToken.id_user;
    const { recipeId } = req.params;
    recipeModel
      .addLike(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  getLikedRecipe: (req, res) => {
    const user_id = req.decodedToken.id_user;
    recipeModel
      .getLikedRecipe(user_id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  unlikeFromDetail: (req, res) => {
    //unlike from detail recipe
    const user_id = req.decodedToken.id_user;
    const { recipeId } = req.params;
    recipeModel
      .unlikeFromDetail(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  unlikeFromList: (req, res) => {
    const { likedId } = req.params;
    recipeModel
      .unlikeFromList(likedId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  bookmarkRecipe: (req, res) => {
    const user_id = req.decodedToken.id_user;
    const { recipeId } = req.params;
    recipeModel
      .addBookmark(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  getBookmarkedRecipe: (req, res) => {
    const user_id = req.decodedToken.id_user;
    recipeModel
      .getBookmarkedRecipe(user_id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  removeBookmarkFromDetail: (req, res) => {
    const user_id = req.decodedToken.id_user;
    const { recipeId } = req.params;
    recipeModel
      .removeBookmarkFromDetail(user_id, recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  removeBookmarkFromList: (req, res) => {
    const { bookmarkId } = req.params;
    recipeModel
      .removeBookmarkFromList(bookmarkId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  addComment: (req, res) => {
    const { recipeId } = req.params;
    const { comment } = req.body;
    const user_id = req.decodedToken.id_user;
    recipeModel
      .addComment(user_id, recipeId, comment)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  getCommentRecipe: (req, res) => {
    const { recipeId } = req.params;
    recipeModel
      .getRecipeComment(recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

  // Popular
  getRecipeByView: (req, res) => {
    const decodeToken = req.decodedToken;
    // console.log(req);
    recipeModel
      .getRecipeByView(decodeToken)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
>>>>>>> 7e8501a37b21be01e3aed3d85e36c5d153429c14
  },
};
