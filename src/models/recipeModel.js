// Punya mas Moko

// const db = require('../config/mySQL')

// module.exports = {
//     addRecipe: (insert_product) => {
//         return new Promise((resolve, reject) => {
//             const queryStr = "INSERT INTO tb_recipe SET ?"
//             db.query(queryStr, insert_product, (err, data) => {
//                 if (!err) {
//                     resolve({ msg: `data berhasil di insert` })
//                 } else {
//                     reject(err)
//                 }
//             })
//         })
//     },
// }

const db = require("../config/mySQL");

module.exports = {
  addRecipe: (insert_product, videos) => {
    return new Promise((resolve, reject) => {
      const queryStr = "INSERT INTO tb_recipe SET ?";
      console.log(insert_product);
      db.query(queryStr, insert_product, (err, data) => {
        if (!err) {
          let no = 1;
          videos.map((res) => {
            const insertVideo = {
              video_title: insert_product.title + ' ' + no++,
              video_file: res.path,
              recipe_id: data.insertId,
            };
            const queryStr1 = "INSERT INTO pivot_video SET ?";
            db.query(queryStr1, insertVideo);
          });
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
