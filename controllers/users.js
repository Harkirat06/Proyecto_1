const usersRouter = require("express").Router()
const User = require("../models/Users")

usersRouter.post("/", async (req, res) => {
   const { body } = req
   const { userName, email, password } = body
   const user = new User({
      userName,
      email,
      passwordHash: password
   })

   User.find({ userName: userName, passwordHash: password}).then(async result => {
      console.log(result)
      if (result.length>0) {
         res.json({Logged: "true"})
      }else{
         if(req.query.register===true){
            const savedUser = await user.save()
            res.json(savedUser)
         }else{
            res.json({account: "Account Not Found"})
         }
      }
   })
})
module.exports = usersRouter