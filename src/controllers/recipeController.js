// const recipeModel = require('../models/recipeModel')

// module.exports = {
//     addRecipe: (req, res) => {

//         let insert_recipe = req.body
//         // const { user_id } = req.decodedToken
//         insert_recipe = {
//             ...insert_recipe,
//             // user_id,
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
//             }).catch((err) => {
//                 // form.error(res, err)
//                 res.status(500).json(err)
//             })
//     },
// }

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