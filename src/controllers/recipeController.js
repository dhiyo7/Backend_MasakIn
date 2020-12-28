const recipeModel = require("../models/recipeModel");
const fs = require("fs");
module.exports = {
  addRecipe: (req, res) => {
    const image = req.files.img;
    const videos = req.files.videos;
    console.log(videos);
    insert_recipe = {
      id_user: req.decodedToken.id_user,
      img: image.map((res) => '/images/' + res.filename),
      title: req.body.title,
      ingredients: req.body.ingredients,
      views: 0
    };

    recipeModel
      .addRecipe(insert_recipe, videos)
      .then((data) => {
        const successAdd = {
          msg: "Recipe added successfully",
          id:data.insertId,
          data: { ...insert_recipe, videos: videos.map((res) => '/videos/' + res.filename) },
        };
        res.json(successAdd);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

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
  getCommentRecipe: (req, res) => {
    const { recipeId } = req.params;
    recipeModel
      .getRecipeComment(recipeId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  },


  //here

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

  getVideoById: (req, res) => {
    const { videoId } = req.params;
    recipeModel
      .getRecipeVideoById(videoId)
      .then((result) => {
        res.status(200).json(result.data[0]);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },

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
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

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
    ])
      .then((result) => {
        const oldVideos = result[0].data[0];
        console.log(bodyUpdate, oldVideos)
        if (videos) {
          if (bodyUpdate.video_file !== oldVideos.video_file) {
            fs.unlink(`./public${oldVideos.video_file}`, (err) => {
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

        res.status(200).json({
          message:`Berhasil di update`,
          data: bodyUpdate
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  //tested
  deleteVideo: (req, res) => {
    const { videoId } = req.params;
    Promise.all([
      recipeModel.getRecipeVideoById(videoId),
      recipeModel.deleteVideo(videoId),
    ])
      .then((result) => {
        const videos = result[0].data[0];
        const deleteVideos = result[1];
        if (!videos) return res.status(404).json("data not found");
        if (videos) {
          if (deleteVideos) {
            fs.unlink(`./public${videos.video_file}`, (err) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.log(`./public${videos.video_file} deleted`);
              }
            });
          }
        }

        res.status(200).json({
          message: `${videos.video_title} deleted`,
          pathDeleted: videos.video_file
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  //end of CRUD Recipe

  // Popular
  Popular: (req, res) => {
    const decodeToken = req.decodedToken;
    // console.log(req);
    recipeModel
      .Popular(decodeToken)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  newRecipe: (req, res) => {
    recipeModel.Newest()
      .then((result) => {
        res.status(200).json(result)
      }).catch((error) => {
        res.status(500).json(error)
      })
  },
};
