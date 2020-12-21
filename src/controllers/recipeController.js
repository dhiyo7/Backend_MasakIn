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
