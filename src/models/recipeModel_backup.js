const { query } = require('express')
const db = require('../config/mySQL')

module.exports = {
    //all recipe
    getAllRecipes: () => {
        return new Promise ((resolve, reject) => {
            const queryStr = `SELECT id_recipe, img, title FROM tb_recipe`
            db.query(queryStr, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message: `berhasil menampilkan data`,
                        data: data
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
    getDetailRecipe: (recipe_id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `SELECT id_recipe, title, img, ingrendients, video FROM tb_recipe WHERE id_recipe = ?`
            db.query(queryStr, recipe_id, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message: `berhasil menampilkan data`,
                        data: data
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
    //like, comment, & bookmark
    addLike: (user_id, recipe_id) => {
        const body = {
            user_id: user_id,
            recipe_id:recipe_id
        }
        return new Promise ((resolve, reject) => {
            const queryStr = `INSERT INTO tb_like_recipe SET ?`
            db.query(queryStr, body, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message:`Liked on ID : ${recipe_id}`,
                        liked: data.insertId
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
    unLike: (user_id, recipe_id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `DELETE FROM tb_like_recipe WHERE user_id = ? AND recipe_id = ?`
            db.query(queryStr,[user_id, recipe_id], (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message: `unliked`
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
    addBookmark: (user_id, recipe_id) => {
        const body = {
            user_id: user_id,
            recipe_id:recipe_id
        }
        return new Promise ((resolve, reject) => {
            const queryStr = `INSERT INTO tb_bookmark_recipe SET ?`
            db.query(queryStr, body, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message:`Bookmarked : ${recipe_id}`,
                        liked: data.insertId
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
    unBookmark: (user_id, recipe_id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `DELETE FROM tb_bookmark_recipe WHERE user_id = ? AND recipe_id = ?`
            db.query(queryStr, [user_id, recipe_id], (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message:`unbookmark`
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
    addComment: (user_id, recipe_id, comment) => {
        const body = {
            user_id: user_id,
            recipe_id:recipe_id,
            comment:comment
        }
        return new Promise ((resolve, reject) => {
            const queryStr = `INSERT INTO tb_comment_recipe SET ?`
            db.query(queryStr, body, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message:`Commented : ${recipe_id}`,
                        commented: data.insertId
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
    //my Recipe
    myRecipes: (user_id) => {
        return new Promise((resolve, reject) => {
            const queryStr = `SELECT id_recipe, img, title FROM tb_recipe WHERE user_id = ?`
            db.query(queryStr, user_id, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message:`Berhasil menampilkan data`,
                        data: data
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
    likedRecipe:(user_id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `SELECT r.id_recipe, r.img, r.title FROM tb_like_recipe lr JOIN tb_recipe r ON lr.recipe_id = r.id_recipe WHERE lr.user_id = ?`
            db.query(queryStr, user_id, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message:`Berhasil menampilkan data`,
                        data: data
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
    bookmarkedRecipe: () => {
        return new Promise ((resolve, reject) => {
            const queryStr = `SELECT r.id_recipe, r.img, r.title FROM tb_bookmark_recipe br JOIN tb_recipe r ON br.recipe_id = r.id_recipe WHERE br.user_id = ?`
            db.query(queryStr, user_id, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message:`Berhasil menampilkan data`,
                        data: data
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
    //crud my recipe
    postNewRecipe: () => {

    },
    detailMyRecipe:(id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `SELECT id_recipe, title, img, ingrendients, video FROM tb_recipe WHERE id_recipe = ?`
            db.query(queryStr, recipe_id, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message: `berhasil menampilkan data`,
                        data: data
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
    updateRecipe: (id, data) => {

    },
    deleteRecipe: (id) => {
        return new Promise ((resolve, reject) => {
            const queryStr = `UPDATE tb_recipe SET is_showed = 0 WHERE id_recipe = ?`
            db.query(queryStr, id, (err, data) => {
                if(!err){
                    resolve({
                        status:200,
                        message: `Successfully archived`
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
}
