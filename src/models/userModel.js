const db = require("../config/mySQL");

module.exports = {
    getUserRecipes: (id) => {
        return new Promise((resolve, reject) => {
            const queryStr = `SELECT id_recipe, img, title FROM tb_recipe WHERE id_user = ?`;
            db.query(queryStr, id, (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `Berhasil menampilkan data`,
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
    addLike: (user_id, recipe_id) => {
        const body = {
            user_id: user_id,
            recipe_id: recipe_id,
        };
        return new Promise((resolve, reject) => {
            const queryStr = `INSERT INTO tb_like_recipe SET ?`;
            db.query(queryStr, body, (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `Recipe ${recipe_id} has been liked`,
                        likedId: data.insertId,
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
    getLike: (user_id) => {
        return new Promise((resolve, reject) => {
            const queryStr = `SELECT lr.id as "like_Id", r.id_recipe, r.img, r.title FROM tb_like_recipe lr JOIN tb_recipe r ON lr.recipe_id = r.id_recipe WHERE lr.user_id = ?`;
            db.query(queryStr, user_id, (err, data) => {
                if (!err) {
                    if (data.length) {
                        resolve({
                            status: 200,
                            message: `Liked`,
                            data: data,
                        });
                    } else {
                        resolve({
                            status: 404,
                            message: `Liked`,
                            data: `Data not found`,
                        });
                    }
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
    checkLike: (user_id, recipe_id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `SELECT * FROM tb_like_recipe WHERE user_id = ? AND recipe_id = ?`
            db.query(queryStr, [user_id,recipe_id], (err, data) => {
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },
    removeLike: (user_id, recipe_id) => {
        return new Promise((resolve, reject) => {
            const queryStr = `DELETE FROM tb_like_recipe WHERE user_id = ? AND recipe_id = ?`;
            db.query(queryStr, [user_id, recipe_id], (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `unliked`,
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

    addBookmark: (user_id, recipe_id) => {
        const body = {
            user_id: user_id,
            recipe_id: recipe_id,
        };
        return new Promise((resolve, reject) => {
            const queryStr = `INSERT INTO tb_bookmark_recipe SET ?`;
            db.query(queryStr, body, (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `Recipe ${recipe_id}  has been bookmarked`,
                        bookmarkId: data.insertId,
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

    getBookmark: (user_id) => {
        return new Promise((resolve, reject) => {
            const queryStr = `SELECT br.id as "bookmark_id", r.id_recipe, r.img, r.title FROM tb_bookmark_recipe br JOIN tb_recipe r ON br.recipe_id = r.id_recipe WHERE br.user_id = ?`;
            db.query(queryStr, user_id, (err, data) => {
                if (!err) {
                    if (data.length) {
                        resolve({
                            status: 200,
                            message: `Bookmark`,
                            data: data,
                        });
                    } else {
                        resolve({
                            status: 404,
                            message: `Bookmark`,
                            data: `Data not Found`,
                        });
                    }
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
    checkBookmark: (user_id, recipe_id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `SELECT * FROM tb_bookmark_recipe WHERE user_id = ? AND recipe_id = ?`
            db.query(queryStr, [user_id,recipe_id], (err, data) => {
                if(!err){
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },

    removeBookmark: (user_id, recipe_id) => {
        return new Promise((resolve, reject) => {
            const queryStr = `DELETE FROM tb_bookmark_recipe WHERE user_id = ? AND recipe_id = ?`;
            db.query(queryStr, [user_id, recipe_id], (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `unbookmark`,
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
    addComment: (user_id, recipeId, comment) => {
        const body = {
            user_id: user_id,
            recipe_id: recipeId,
            comment: comment,
        };
        return new Promise((resolve, reject) => {
            const queryStr = `INSERT INTO tb_comment_recipe SET ?`;
            db.query(queryStr, body, (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `You commented ${comment} on recipe ${recipeId}`,
                        // commented: data.insertId
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

}