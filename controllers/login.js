const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt")
const User = require("../models/Users")
const loginRouter = require("express").Router()
const express = require('express')
loginRouter.use(express.json())

loginRouter.post("/", async (req, res, next) => {
const { body } = req
   const { userName, password } = body
   const user = await User.findOne({userName})
   const passwordCorrect = user === null
                            ? false 
                            : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect){
        return res.status(401).json({
            "error" :  "El usuario o contraseña está mal"
        })
    }else{
        const userToken = {
            id: user._id,
            username: user.userName
        }
        
        const token = jwt.sign(userToken, process.env.TOKEN)
        return res.status(202).send({
            username: user.userName,
            token
        })
    }
})
module.exports = loginRouter