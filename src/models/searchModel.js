const db = require("../config/mySQL");
const form = require("../helpers/form");

module.exports = {
    searchRecipe : (addQuery,urlQuery, total_result, page, offset, limit) => {
        return new Promise((resolve, reject) => {
            let qs = `SELECT id_recipe, title, img FROM tb_recipe ` + addQuery + `LIMIT ${limit} OFFSET ${offset} `
            console.log(urlQuery)
            db.query(qs, (err, data) => {
                if (!err) {
                    if (data.length) {
                        newData = {
                            recipe: data,
                            pageInfo: {
                                result: total_result,
                                totalPage:total_result%limit === 0 ? total_result/limit : Math.floor(total_result/limit)+1 ,
                                currentPage: page || 1,
                                previousPage:
                                    page === 1 ? null : `/search?${urlQuery}&page=${page - 1}&limit=${limit}`,
                                nextpage: total_result-(offset+limit) < 0 //dia sudah pada result2 terakhir
                                    ? null
                                    : `/search?${urlQuery}&page=${page + 1}&limit=${limit}`
                            }
                        }
                        resolve(newData)
                    }
                } else {
                    reject(err)
                }
            })
        })
    },
    totalResult : (addQuery) => {
        return new Promise((resolve, reject) => {
            let qs = `SELECT count(title) as total_result FROM tb_recipe ` + addQuery
            db.query(qs, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })

        })
    },
    Newest: () => {
        return new Promise ((resolve, reject) => {
            const qs = `SELECT id_recipe, title, img, last_modified FROM tb_b_recipe ORDER BY last_modified LIMIT 1 OFFSET 0`
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
    Popular : () => {
        return new Promise ((resolve, reject) => {
            const qs = `SELECT tr.id_recipe, tr.title, IFNULL(rl.like, 0) as count_like FROM tb_b_recipe tr LEFT JOIN (SELECT recipe_id, count(recipe_id) as 'like' FROM tb_b_like_recipe GROUP BY recipe_id) rl ON tr.id_recipe = rl.recipe_id  
            ORDER BY count_like  DESC LIMIT 6 OFFSET 0`
            db.query(qs, (err, data) => {
                if(!err){
                    if(data.length){
                        resolve({
                            status:200,
                            data:data
                        })
                    }else{
                        reject({
                            status:404
                        })
                    }
                }else{
                    reject(err)
                }
            })
        })
    },
    mostViewed: () => {
        return new Promise ((resolve, reject) => {
            const qs = `SELECT id_recipe, title, img, viewed FROM tb_b_recipe ORDER BY viewed DESC LIMIT 6 OFFSET 0`
            db.query(qs, (err, data) => {
                if(!err){
                    if(data.length){
                        resolve({
                            status:200,
                            message:`Most Viewed`,
                            data:data
                        })
                    }else{
                        reject({
                            status:404
                        })
                    }
                }else{
                    reject(err)
                }
            })
        })
    }
}