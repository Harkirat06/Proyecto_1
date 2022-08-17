const usersRouter = require("express").Router()
const User = require("../models/Users")
const bcrypt = require("bcrypt")

usersRouter.post("/", async (req, res) => {
   const { body } = req
   const { userName, email, password } = body
   const passwordHash = await bcrypt.hash(password, 10)
   const user = new User({
      userName,
      email,
      passwordHash
   })
    User.find({$or: [{ userName: userName},{email: email}]}
    ).then( async (result) => {
      console.log(result)
         if (result.length >= 1) {
            res.json("Usuario o email ya registrado")
         } else {
            const savedUser = await user.save()
            res.json(savedUser)
         }
      })
   /*const login = req.query.login
   User.find({ userName: userName}).then(async result => {
      result.map(s=>{
         bcrypt.compare(password,s.passwordHash,async (err,r)=>{
            console.log(r)
            if (r) {
               res.json({Logged: "true"})
            }else{
               if(login==="false"){
                  const savedUser = await user.save()
                  res.json(savedUser)
               }else{
                  res.json({account: "Account Not Found"})
               }
            }
            
         })
      })
   })*/
})
module.exports = usersRouter