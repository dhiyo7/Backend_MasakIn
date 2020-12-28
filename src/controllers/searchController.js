const searchModel = require("../models/searchModel");
const form = require("../helpers/form");

module.exports = {
    searchRecipe: (req, res) => {
        const { query } = req;
        // const urlQuery = `title=${query.title}`
        const limit = Number(query.limit) || 10 //jika tidak terdeklarasi limit otomatis 5
        const page = Number(query.page) || 1 //jika tidak terdeklarasi page otomatis 1
        const offset = (page - 1) * limit

        const { title } = req.query;
        let addQuery = ``
        let urlQuery = ``
        let query_length = Object.keys(req.query).length - 1
        if (query.page) {
            query_length -= 1
        }
        if (query.limit) {
            query_length -= 1
        }
        let initial = 0

        if (Object.keys(req.query).length) {
            if (title != null) {
                addQuery += ` WHERE title like '%${title}%' `
                urlQuery += `title=${title}`
                // urlQuery += `&`
                // if (initial != query_length) {
                //     addQuery += `AND `
                //     initial += 1
                // }
            }
        }
        console.log(addQuery, urlQuery, offset, limit)
        searchModel.totalResult(addQuery)
            .then((result) => {
                searchModel.searchRecipe(addQuery, urlQuery, result[0].total_result, page, offset, limit)
                    .then((data) => {
                        res.status(200).json(data)
                    })
            }).catch((err) => {
                res.status(500).json(err)
            });
    },

};