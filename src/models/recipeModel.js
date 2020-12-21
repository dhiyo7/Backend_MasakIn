const db = require('../config/mySQL')

module.exports = {
    addRecipe: (insert_product) => {
        return new Promise((resolve, reject) => {
            const queryStr = "INSERT INTO tb_recipe SET ?"
            db.query(queryStr, insert_product, (err, data) => {
                if (!err) {
                    resolve({ msg: `data berhasil di insert` })
                } else {
                    reject(err)
                }
            })
        })
    },
}
