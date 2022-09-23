const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt")
const User = require("../models/Users")
const loginRouter = require("express").Router()

loginRouter.post("/", async (req, res, next) => {
    const { body } = req
    const { userName, password, google, remind } = body
    const user = await User.findOne({ userName })
    if (password == "" && !google) {
        res.status(401).json({ "error": "Inicia seion con Google" })
    } else {
        if (password == "" && google) {
            const userToken = {
                username: user.userName
            }

            const token = jwt.sign(userToken, process.env.TOKEN, {
                expiresIn: 60*60*24
            })
            return res.status(202).send({
                username: user.userName,
                token
            })
        } else {
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(password, user.passwordHash)

            if (!passwordCorrect) {
                return res.status(401).json({
                    "error": "El usuario o contraseña está mal"
                })
            } else {
                const userToken = {
                    username: user.userName
                }

                const token = jwt.sign(userToken, process.env.TOKEN, {
                    expiresIn: 60 * 60 * 24 * 7
                })
                return res.status(202).send({
                    username: user.userName,
                    token
                })
            }
        }
    }
})

module.exports = loginRouter