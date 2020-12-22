// const { response } = require('express')
const authModel = require('../models/authModel')

module.exports = {
    signup: (req, res) => {
        const { body } = req
        console.log(body.password, body.password_conf)
        if (body.password != body.password_conf) {
            res.status(500).json({
                status: 500,
                message: `Password tidak sama!`
            })
        } else {
            authModel.signup(body)
                .then((result) => {
                    res.status(200).json(result)
                }).catch((error) => {
                    res.status(500).json(error)
                })
        }
    },
    activate_account: (req, res) => {
        const { tokenId } = req.params
        if(tokenId){
            authModel.activate_account(tokenId)
            .then((result) => {
                res.status(200).json(result)
            }).catch((error) => {
                res.status(500).json(error)
            })
        }else{
            res.status(500).json({
                status:500,
                message:`Token NULL`
            })
        }
        
    },
    login: (req, res) => {
        const { body } = req
        authModel.login(body)
            .then((result) => {
                res.status(200).json(result)
            }).catch((error) => {
                res.status(500).json(error)
            })

    },
    forgot_password: (req, res) => {
        const { body } = req
        authModel.forgot_password(body)
            .then((result) => {
                res.status(200).json(result)
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    reset_password: (req, res) => {
        let { body } = req
        body = {
            ...body,
            token: req.params.tokenId
        }
        authModel.reset_password(body)
            .then((result) => {
                res.status(200).json(result)
            }).catch((error) => {
                res.status(500).json(error)
            })
    },
    logout: (req, res) => {
        const bearerToken = req.header("x-access-token");
        if (!bearerToken) {
            res.status(500).json({
                status: 500,
                message: 'NULL token'
            })
        } else {
            const blacklistToken = {
                token : bearerToken.split(" ")[1]
            }
            authModel.logout(blacklistToken)
                .then((result) => {
                    res.status(200).json(result)
                }).catch((error) => {
                    res.status(500).json(error)
                })
        }

    }
}