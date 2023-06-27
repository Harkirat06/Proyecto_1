const dirRouter = require("express").Router()
const fs = require('fs')
const tokenExtractor = require("../middlewares/tokenExtractor")


var n = 1 

dirRouter.post("/",tokenExtractor,(req,res,next)=>{
    const path = "." + req.query.path + "/Nueva Carpeta "
    try {
      if (!fs.existsSync(path + n)){
      fs.mkdirSync(path + n)
      }else{
        n++
        fs.mkdirSync(path + n)
      }
      } catch (err) {
      next(err)
      }
      res.sendStatus(201)
  })

module.exports = dirRouter