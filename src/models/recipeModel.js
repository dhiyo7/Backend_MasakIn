const db = require("../config/mySQL");

module.exports = {
  addRecipe: (insert_product, videos) => {
    return new Promise((resolve, reject) => {
      const queryStr = "INSERT INTO tb_recipe SET ?";
      db.query(queryStr, insert_product, (err, data) => {
        if (!err) {
          let no = 1;
          videos.map((res) => {
            const insertVideo = {
              video_title: 'Step membuat '+insert_product.title + " ke- " + no++,
              video_file: '/videos/'+res.filename,
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

  getAllRecipes: () => {
    return new Promise((resolve, reject) => {
      const queryStr = `SELECT id_recipe, img, title FROM tb_recipe`;
      db.query(queryStr, (err, data) => {
        if (!err) {
          // console.log(data)
          // console.log('resolve')
          resolve({
            status: 200,
            message: `berhasil menampilkan data`,
            data: data,
          });
          // resolve(data)
        } else {
          console.log("reject");
          reject({
            status: 500,
            message: `Encountered error`,
            details: err,
          });
        }
      });
    });
  },

  getRecipeById: (recipeId) => {
    return new Promise((resolve, reject) => {
      const queryStr = `select * from tb_recipe where id_recipe = ?`;
      db.query(queryStr, recipeId, (err, data) => {
        if (!err) {
          // console.log(data);
          const counterQuery = `UPDATE tb_recipe SET views = (views +1) WHERE id_recipe = ?`;
          db.query(counterQuery, recipeId, (err, data) => {
            if (err) {
              reject({
                status: 500,
                message: `Encountered error`,
                details: err,
              });
            }
          });
          resolve({ data: data[0] });
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err,
          });
        }
      });
    });
  },

  updateRecipe: (recipeId, updateData) => {
    return new Promise ((resolve, reject) => {
      const queryStr = `UPDATE tb_recipe SET ? WHERE id_recipe = ?`
      db.query(queryStr, [updateData, recipeId], (err, data) => {
        if(!err){
          resolve({
            status:200,
            message:`update berhasil pada id ${recipeId}`
          })
        }else{
          reject({
            status:500,
            message:`update Gagal`
          })
        }
      })
    })
  },

  deleteRecipe: (recipeId) => {
    return new Promise ((resolve, reject) => {
      const queryStr = `DELETE FROM tb_recipe WHERE id_recipe = ?`
      db.query(queryStr, recipeId, (err, data) => {
        if(!err){
          resolve({
            status:200,
            message:`data berhasil dihapus`
          })
        }else{
          reject({
            status:500,
            details:err
          })
        }
      })
    })
  },

  getImgToDelete: (recipeId) => {
    return new Promise ((resolve, reject) => {
      const queryStr = `SELECT img FROM tb_recipe WHERE id_recipe = ?`
      db.query(queryStr, recipeId, (err,data) => {
        if(!err){
          resolve({
            imgToDel: data
          })
        }else{
          resolve(err)
        }
      })
    })
  },

  getVideoToDelete: (recipeId) => {
    return new Promise ((resolve, reject) => {
      const queryStr = `SELECT video_file FROM pivot_video WHERE recipe_id = ?`
      db.query(queryStr, recipeId, (err,data) => {
        if(!err){
          resolve({
            videoToDel: data
          })
        }else{
          resolve(err)
        }
      })
    })
  },

  deleteTblVideo: (recipeId) => {
    return new Promise ((resolve, reject) => {
      const queryStr = `DELETE FROM pivot_video WHERE recipe_id = ?`
      db.query(queryStr, recipeId, (err, data) => {
        if(!err){
          resolve(data)
        }else{
          resolve(err)
        }
      })
    })
  },

  getRecipeVideoByIDRecipe: (recipeId) => {
    return new Promise((resolve, reject) => {
      const queryStr = `select * from pivot_video where recipe_id = ?`;
      db.query(queryStr, recipeId, (err, data) => {
        if (!err) {
          // console.log(data);
          resolve({ data: data });
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err,
          });
        }
      });
    });
  },

  addRecipeVideo: (params) => {
    return new Promise((resolve, reject) => {
      const queryStr = "INSERT INTO pivot_video SET ?";
      // console.log(params);
      db.query(queryStr, params, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  updateRecipeVideo: (params, videoId) => {
    return new Promise((resolve, reject) => {
      const queryStr = "UPDATE pivot_video SET ? where id = ?";
      // console.log(params);
      db.query(queryStr, [params, videoId], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getRecipeVideoById: (videoId) => {
    return new Promise((resolve, reject) => {
      const queryStr = `select * from pivot_video where id = ?`;
      db.query(queryStr, videoId, (err, data) => {
        if (!err) {
          console.log(data);
          resolve({
            data: data,
          });
        } else {
          reject({
            status: 500,
            message: `Encountered error`,
            details: err,
          });
        }
      });
    });
  },

  deleteVideo: (videoId) => {
    return new Promise((resolve, reject) => {
      const queryStr = "DELETE from pivot_video where id = ?";
      // console.log(params);
      db.query(queryStr, videoId, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  //end of CRUD recipe

  getRecipeComment: (recipeId) => {
    return new Promise((resolve, reject) => {
      const queryStr = `SELECT r.id_recipe, r.title, u.name, c.comment, c.created_at FROM tb_comment_recipe c JOIN tb_user u ON c.user_id = u.id_user JOIN tb_recipe r ON r.id_recipe = c.recipe_id WHERE c.recipe_id = ? ORDER BY c.created_at DESC`;
      db.query(queryStr, recipeId, (err, data) => {
        if (!err) {
          if (data.length) {
            resolve({
              recipeId: data[0].id_recipe,
              recipeName: data[0].title,
              data: data, //hhehe
            });
          } else {
            reject({
              status:404,
              data: `No comment yet.`, //hhehe
            });
          }
        } else {
          reject({
            status: 1024,
            message: `Encountered error`,
            details: err,
          });
        }
      });
    });
  },

  // Popular
  Popular: (decodeToken) => {
    const checkUser = decodeToken;
    return new Promise((resolve, reject) => {
      let queryStr = "";
      if (checkUser != undefined) {
        // console.log("Ada user");
        queryStr += `
        SELECT tr.id_recipe, tr.title, tr.img, IFNULL(rl.like, 0) as count_like FROM tb_recipe tr LEFT JOIN (SELECT recipe_id, count(recipe_id) as 'like' FROM tb_like_recipe GROUP BY recipe_id) rl ON tr.id_recipe = rl.recipe_id  
            ORDER BY count_like  DESC LIMIT 6 OFFSET 0
        `;
      } else {
        // console.log("Tidak ada user");
        queryStr += `SELECT id_recipe, img, title, views FROM tb_recipe ORDER BY views DESC LIMIT 6 OFFSET 0`;
      }

      // console.log(decodeToken);
      db.query(queryStr, (err, data) => {
        if (!err) {
          // console.log(data)
          // console.log('resolve')
          resolve({
            status: 200,
            message: `berhasil menampilkan data`,
            data: data,
          });
          // resolve(data)
        } else {
          console.log("reject");
          reject({
            status: 500,
            message: `Encountered error`,
            details: err,
          });
        }
      });
    });
  },
  Newest: () => {
    return new Promise ((resolve, reject) => {
        const qs = `SELECT id_recipe, title, img, last_modified FROM tb_recipe ORDER BY last_modified DESC LIMIT 1 OFFSET 0`
        db.query(qs, (err, data) => {
            if(!err){
                resolve({
                    status:200,
                    data:data
                })
            }else{
                reject(err)
            }
        })
    })
},

};
