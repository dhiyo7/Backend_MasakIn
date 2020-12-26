const recipeModel = require("../models/recipeModel");
const fs = require("fs");
module.exports = {
  addRecipe: (req, res) => {
    // const { user_id } = req.decodedToken
    const image = req.files.img;
    const videos = req.files.videos;
    // console.log(videos);

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

  getVideoById: (req, res) => {
    const { videoId } = req.params;
    recipeModel
      .getRecipeVideoById(videoId)
      .then((result) => {
        res.status(200).json(result.data[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

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
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

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
    ])
      .then((result) => {
        const oldVideos = result[0].data[0];
        if (videos) {
          if (params.video_file !== oldVideos.video_file) {
            fs.unlink(`${oldVideos.video_file}`, (err) => {
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

        res.status(200).json(params);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  deleteVideo: (req, res) => {
    const params = req.body;
    const { videoId } = req.params;
    console.log(params);
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
            fs.unlink(`${videos.video_file}`, (err) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.log(`${videos.video_file} deleted`);
              }
            });
          }
        }

        res.status(200).json(videoId);
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
