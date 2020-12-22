const searchModel = require("../models/searchModel");
const form = require("../helpers/form");

module.exports = {
    searchRecipe: (req, res) => {
        const { query } = req;
        const urlQuery = `title=${query.title}`
        const limit = Number(query.limit) || 10 //jika tidak terdeklarasi limit otomatis 5
        const page = Number(query.page) || 1 //jika tidak terdeklarasi page otomatis 1
        const offset = (page - 1) * limit
        searchModel.totalResult(query)
            .then((result) => {
                searchModel.searchRecipe(query,urlQuery, result[0].total_result, page, offset, limit)
                    .then((data) => {
                        res.status(200).json(data)
                    })
            }).catch((err) => {
                res.status(500).json(err)
            });
    },
};