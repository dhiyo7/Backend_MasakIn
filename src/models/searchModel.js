const db = require("../config/mySQL");
const form = require("../helpers/form");

module.exports = {
    searchRecipe : (query,urlQuery, total_result, page, offset, limit) => {
        return new Promise((resolve, reject) => {
            const qs = `SELECT id_recipe, title, img FROM tb_recipe WHERE title LIKE '%${query.title}%' LIMIT ${limit} OFFSET ${offset} `
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
                                    page === 1 ? null : `/search?${urlQuery}page=${page - 1}&limit=${limit}`,
                                nextpage: offset+limit <= total_result //dia sudah pada result2 terakhir
                                    ? null
                                    : `/search?${urlQuery}page=${page + 1}&limit=${limit}`
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
    totalResult : (query) => {
        return new Promise((resolve, reject) => {
            const qs = `SELECT count(title) as total_result FROM tb_recipe WHERE title LIKE '%${query.title}%'`
            db.query(qs, (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })

        })
    }
}