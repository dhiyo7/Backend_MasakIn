const recipeModel = require('../models/recipeModel')

module.exports = {
    addRecipe: (req, res) => {
        let insert_recipe = req.body
        // const { user_id } = req.decodedToken
        insert_recipe = {
            ...insert_recipe,
            // user_id,
            img: req.filePath
        }
        const image = req.filePath.split(',')
        recipeModel.addRecipe(insert_recipe)
            .then((data) => {
                // form.success(res, {
                //     ...insert_recipe,
                //     img: image
                // })
                res.status(200).json({...insert_recipe,
                    img: image})
            }).catch((err) => {
                // form.error(res, err)
                res.status(500).json(err)
            })
    },
}