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
  updateRecipe: () => {

  },
  getAllRecipes: () => {
    return new Promise((resolve, reject) => {
      const queryStr = `SELECT id_recipe, img, title FROM tb_recipe WHERE is_showed = 1`
      db.query(queryStr, (err, data) => {
        if (!err) {
          // console.log(data)
          // console.log('resolve')
          resolve({
            status: 200,
            message: `berhasil menampilkan data`,
            data: data
          })
          // resolve(data)
        } else {
          console.log('reject')
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  getRecipesByUser: (id) => {
    return new Promise((resolve, reject) => {
      const queryStr = `SELECT id_recipe, img, title FROM tb_recipe WHERE user_id = ?`
      db.query(queryStr, user_id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `Berhasil menampilkan data`,
            data: data
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  addLike: (user_id, recipe_id) => {
    const body = {
      user_id: user_id,
      recipe_id: recipe_id
    }
    return new Promise((resolve, reject) => {
      const queryStr = `INSERT INTO tb_like_recipe SET ?`
      db.query(queryStr, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `Recipe ${recipe_id} has been liked`,
            likedId: data.insertId
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  getLikedRecipe: (user_id) => {
    return new Promise((resolve, reject) => {
      const queryStr = `SELECT lr.id as "like_Id", r.id_recipe, r.img, r.title FROM tb_like_recipe lr JOIN tb_recipe r ON lr.recipe_id = r.id_recipe WHERE lr.user_id = ?`
      db.query(queryStr, user_id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `Liked`,
            data: data
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  unlikeFromDetail: (user_id, recipe_id) => {
    return new Promise((resolve, reject) => {
      const queryStr = `DELETE FROM tb_like_recipe WHERE user_id = ? AND recipe_id = ?`
      db.query(queryStr, [user_id, recipe_id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `unliked`
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  unlikeFromList: (likedId) => {
    return new Promise((resolve, reject) => {
      const queryStr = `DELETE FROM tb_like_recipe WHERE id = ?`
      db.query(queryStr, likedId, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `unliked ${likedId}`
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  addBookmark: (user_id, recipe_id) => {
    const body = {
      user_id: user_id,
      recipe_id: recipe_id
    }
    return new Promise((resolve, reject) => {
      const queryStr = `INSERT INTO tb_bookmark_recipe SET ?`
      db.query(queryStr, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `Recipe ${recipe_id}  has been bookmarked`,
            bookmarkId: data.insertId
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  getBookmarkedRecipe: (user_id) => {
    return new Promise((resolve, reject) => {
      const queryStr = `SELECT br.id as "bookmark_id", r.id_recipe, r.img, r.title FROM tb_bookmark_recipe br JOIN tb_recipe r ON br.recipe_id = r.id_recipe WHERE br.user_id = ?`
      db.query(queryStr, user_id, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `Bookmark`,
            data: data
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  removeBookmarkFromDetail: (user_id, recipe_id) => {
    return new Promise((resolve, reject) => {
      const queryStr = `DELETE FROM tb_bookmark_recipe WHERE user_id = ? AND recipe_id = ?`
      db.query(queryStr, [user_id, recipe_id], (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `unbookmark`
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  removeBookmarkFromList: (bookmarkId) => {
    return new Promise((resolve, reject) => {
      const queryStr = `DELETE FROM tb_bookmark_recipe WHERE id = ?`
      db.query(queryStr, bookmarkId, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `remove Bookmark : ${bookmarkId}`
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  addComment: (user_id, recipeId, comment) => {
    const body = {
      user_id: user_id,
      recipe_id: recipeId,
      comment: comment
    }
    return new Promise((resolve, reject) => {
      const queryStr = `INSERT INTO tb_comment_recipe SET ?`
      db.query(queryStr, body, (err, data) => {
        if (!err) {
          resolve({
            status: 200,
            message: `You commented ${comment} on recipe ${recipeId}`,
            // commented: data.insertId
          })
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  getRecipeComment: (recipeId) => {
    return new Promise ((resolve, reject) => {
      const queryStr = `SELECT r.id_recipe, r.title, u.name, c.comment FROM tb_comment_recipe c JOIN tb_user u ON c.user_id = u.id_user JOIN tb_recipe r ON r.id_recipe = c.recipe_id WHERE c.recipe_id = ?`
      db.query(queryStr, recipeId, (err, data) =>{
        if(!err){
          resolve({
            recipeId: data[0].id_recipe,
            recipeName: data[0].title,
            data:data //hhehe
          })
        }else{
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  },
  deleteRecipe: (recipeId) => {
    return new Promise ((resolve, reject) => {
      const queryStr = `DELETE FROM tb_recipe WHERE id_recipe = ?`
      db.query(queryStr, recipeId, (err, data) =>{
        if(!err){
          resolve({
            status:200,
            message:`Successfully deleted`
          })
        }else{
          reject({
            status: 500,
            message: `Encountered error`,
            details: err
          })
        }
      })
    })
  }
};
