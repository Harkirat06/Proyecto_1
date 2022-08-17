const bcrypt = require("bcrypt")
const User = require("../models/Users")
const loginRouter = require("express").Router()

loginRouter.post("/", async (req, res) => {
    const { body } = req
   const { userName, password } = body
   const user = await User.findOne({userName})
   const passwordCorrect = user === null
                            ? false 
                            : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect){
        res.json({
            "error" :  "El usuario o contraseña está mal"
        }).status(401)
    }else{
        res.json({
            userName
        }).status(200)
    }
})
module.exports = loginRouter