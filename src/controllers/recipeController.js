<<<<<<< HEAD
// const recipeModel = require('../models/recipeModel')

// module.exports = {
//     addRecipe: (req, res) => {

=======
// Punya mas moko

// const recipeModel = require('../models/recipeModel')

// module.exports = {
//     addRecipe: (req, res) => {
>>>>>>> 852bfa789086e52cb8564614e6352e91b9bdfb88
//         let insert_recipe = req.body
//         // const { user_id } = req.decodedToken
//         insert_recipe = {
//             ...insert_recipe,
//             // user_id,
<<<<<<< HEAD
//             img: req.filePath,
//             // video: req.filePathVideo
//         }
//         const image = req.filePath.split(',')
//         // const video = req.filePathVideo.split(',')
//         // console.log(video)
//         recipeModel.addRecipe(insert_recipe)
//             .then((data) => {
//                 res.status(200).json({...insert_recipe,
//                     img: image,
//                     video: video})
=======
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
>>>>>>> 852bfa789086e52cb8564614e6352e91b9bdfb88
//             }).catch((err) => {
//                 // form.error(res, err)
//                 res.status(500).json(err)
//             })
//     },
// }

<<<<<<< HEAD
const recipesModel = require("../models/recipeModel");
const form = require("../helpers/form")

module.exports ={
    addRecipes : (req, res) => {
        const { body } = req;
        const filePathImages = JSON.stringify(
            req.files.map((e) => process.env.HOSTNAME + "/images" + "/" + e.filename + " ")
        )
        const filePathVideos = JSON.stringify(
            req.files.map((e) => process.env.HOSTNAME + "/videos" + "/" + e.filename + " ")
        )

        const insertBody = { ...body, updated_at: new Date(Date.now()), recipe_img: filePathImages, recipe_video: filePathVideos, };
    productsModel

        recipesModel
        .addRecipes(insertBody, filePathImages, filePathVideos)
        .then((data) => {
            const successAdd = {
                msg: "Recipe has been added",
                data: {
                    id:data.insertId,
                    ...insertBody
                }
            }
            form.success(res, successAdd);
        })
        .catch((err) => { 
            const error ={
                msg: "Recipe failed to add",
                err,
            }
            form.error(res, error);
        })
    },
}
=======
const recipeModel = require("../models/recipeModel");
module.exports = {
  addRecipe: (req, res) => {
    // const { user_id } = req.decodedToken
    const image = req.files.img;
    const videos = req.files.videos;

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
};
>>>>>>> 852bfa789086e52cb8564614e6352e91b9bdfb88
