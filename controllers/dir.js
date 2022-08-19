const dirRouter = require("express").Router()
const fs = require('fs')

var n = 1 

dirRouter.post("/",(req,res,next)=>{
    const path = "." + req.query.path + "/Nueva Carpeta "
    try {
      if (!fs.existsSync(path + n)){
      fs.mkdirSync(path + n)
      }else{
        n++
        fs.mkdirSync(path + n)
      }
      } catch (err) {
      console.error(err)
      }
      res.sendStatus(201)
  })

module.exports = dirRouter