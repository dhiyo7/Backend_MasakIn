const express = require('express')
const authController = require ('../controllers/authController')
const authRouter = express.Router()

const checkToken = require ('./../helpers/checkToken')

authRouter.post('/signup',checkToken.isRegistered, authController.signup)
authRouter.get('/activate_account/:tokenId',authController.activate_account)
authRouter.post('/login',authController.login)
authRouter.post('/forgot_password', authController.forgot_password)
authRouter.patch('/reset_password/:tokenId', authController.reset_password)
authRouter.delete('/logout', authController.logout)

module.exports = authRouter