const db = require("../config/mySQL");
const form = require("../helpers/form");

module.exports = {
    searchRecipe : (addQuery,urlQuery, total_result, page, offset, limit) => {
        return new Promise((resolve, reject) => {
            let qs = `SELECT id_recipe, title, img FROM tb_recipe ` + addQuery + `LIMIT ${limit} OFFSET ${offset} `
            // console.log(qs)
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
}