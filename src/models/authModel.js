const db = require('../config/mySQL')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

module.exports = {
    signup: (body) => {
        //delete key password_conf
        delete body.password_conf
        body = {
            ...body,
            is_active: 0
        }
            return new Promise((resolve, reject) => {
            //saltRounds
            const saltRounds = Math.floor(Math.random() * 10) + 1;
            //hash password
            bcrypt.hash(body.password, saltRounds, (err, hasedPassword) => {
                const newUser = {
                    ...body,
                    password: hasedPassword
                }
                const queryStr = `INSERT INTO tb_user SET ?`
                db.query(queryStr, newUser, (err, data) => {
                    if (!err) {
                        //activateAcccount ( via token ) expires In 15 mins
                        const payload = {
                            email: body.email
                        }
                        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1000 * 60 * 15 })
                        //Nodemailer: 
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            host: 'smtp.gmail.com',
                            port: 578,
                            secure: false,
                            auth: {
                                user: process.env.USER_EMAIL,
                                pass: process.env.PASS_EMAIL
                            }
                        })
                        
                        let mailOptions = {
                            from: "IT Team <teamfoodrecipe@gmail.com>",
                            to: body.email,
                            subject: 'Activate Account From FoodRecipe Team',
                            html: ` <h1> TESTING API </h1>
                            <p> Hello, please click link below to activate your account: </p>
                            <a href="${process.env.HOSTNAME}/auth/activate_account/${token}"> ${process.env.HOSTNAME}/auth/activate_account/${token} </a> `
                        }
                        resolve(
                            transporter.sendMail(mailOptions, (err, data) => {
                                if(err) {
                                    console.log("Its Error: ", err);
                                } else {
                                    console.log("Sent Success!!!!");
                                }
                            })
                        )
                    } else {
                        reject({
                            status: 500,
                            message: `Encountered error`,
                            details: err
                        })
                    }
                })
            })
        })
    },
    activate_account: (tokenId) => {
        const decodedToken = jwt.verify(tokenId, process.env.SECRET_KEY)
        const email = decodedToken.email
        return new Promise((resolve, reject) => {
            const queryStr = `UPDATE tb_user SET is_active = 1 WHERE email = ?`
            db.query(queryStr, email, (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `Selamat akun anda berhasil di aktivasi`
                    })
                } else {
                    reject({
                        status: 500,
                        message: `Encountered ERROR`,
                        details: err
                    })
                }
            })
        })
    },
    login: (body) => {
        const { email, password } = body
        return new Promise((resolve, reject) => {
            const queryStr = `SELECT id_user,email,name,is_active, password FROM tb_user WHERE email = ?`
            db.query(queryStr, email, (err, data) => {
                if (!err) {
                    if (data[0]) {
                        bcrypt.compare(password, data[0].password, (err, result) => {
                            if (!err) {
                                if (!result) {
                                    reject({
                                        status: 401,
                                        message: `Password salah`
                                    })
                                } else {
                                    if(data[0].is_active != 0){
                                        const payload = {
                                            id_user:data[0].id_user,
                                            name: data[0].name,
                                        }
                                        const token = jwt.sign(payload, process.env.SECRET_KEY)
                                        resolve({
                                            status: 200,
                                            message: `Berhasil login`,
                                            tokenId: token,
                                            email: email,
                                            id_user:data[0].id_user,
                                            name: data[0].name,
                                            tokenId: token
                                        })
                                    }else{
                                        reject({
                                            status:401,
                                            message: `Please activate your account FIRST!`
                                        })
                                    }
                                }
                            } else {
                                reject({
                                    status: 500,
                                    message: `Hash error`,
                                    details: err
                                })
                            }
                        })
                    } else {
                        reject({
                            status: 404,
                            message: `Email ${email} tidak ditemukan!`
                        })
                    }
                } else {
                    reject({
                        status: 500,
                        message: `Encountered ERROR`,
                        details: err
                    })
                }
            })
        })
    },
    forgot_password: (body) => {
        const { email } = body
        return new Promise((resolve, reject) => {
            const queryStr = `SELECT email FROM tb_user WHERE email = ?`
            db.query(queryStr, email, (err, data) => {
                if (!err) {
                    if (data[0]) {
                        const payload = {
                            email: data[0].email
                        }
                        const tokenForgot = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1000 * 60 * 15 })
                        resolve({
                            status: 200,
                            email: email,
                            message: `/auth/reset_password/`,
                            token: tokenForgot
                        })
                    } else {
                        reject({
                            status: 404,
                            message: `Email tidak ditemukan`
                        })
                    }
                } else {
                    reject({
                        status: 500,
                        message: `Encountered ERROR`,
                        details: err
                    })
                }
            })
        })
    },
    reset_password: (body) => {
        const { token, new_password } = body
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const email = decodedToken.email
        return new Promise((resolve, reject) => {
            const saltRounds = Math.floor(Math.random() * 10) + 1
            bcrypt.hash(new_password, saltRounds, (err, hasedPassword) => {
                if (!err) {
                    const queryStr = `UPDATE tb_user SET password = ? WHERE email = ?`
                    db.query(queryStr, [hasedPassword, email], (err, data) => {
                        if (!err) {
                            resolve({
                                status: 200,
                                message: `Selamat password anda berhasil diubah`
                            })
                        } else {
                            reject({
                                status: 500,
                                message: `Encountered ERROR`,
                                details: err
                            })
                        }
                    })
                } else {
                    reject({
                        status: 500,
                        message: `Encountered and ERROR`,
                        details: err
                    })
                }
            })
        })
    },
    logout: (blacklistToken) => {
        return new Promise((resolve, reject) => {
            const queryStr = `INSERT INTO tb_blacklist_token SET ?`
            db.query(queryStr, blacklistToken, (err, data) => {
                if (!err) {
                    resolve({
                        status: 200,
                        message: `Logout successfull`
                    })
                } else {
                    reject({
                        status: 500,
                        message: `Encountered ERROR`,
                        details: err
                    })
                }
            })
        })

    }
}