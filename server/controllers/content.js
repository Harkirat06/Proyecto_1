const contentRouter = require("express").Router()
const User = require("../models/Users")
const p = require('path')
const fs = require('fs')
const tokenExtractor = require("../middlewares/tokenExtractor")

const lista = (dirPath, data) => {
  var ls = fs.readdirSync(dirPath)
  for (let i = 0; i < ls.length; i++) {
    const file = p.join(dirPath, ls[i])
    var dataFile = null
    dataFile = fs.lstatSync(file)
    if (dataFile) {
      data.push(
        {
          "path": file,
          "filename": ls[i],
          "isDirectory": dataFile.isDirectory(),
          "length": dataFile.size,
        });

      /*if(dataFile.isDirectory()){
         lista(file)
      }*/
    }
  }

}

contentRouter.get("/", tokenExtractor, async (req, res, next) => {
  const path = req.query.path
  if (path !== "") {
    const data = []
    try {
      lista("." + path, data)
      res.json({
        data
      })
    } catch (error) {
      next(error)
    }
  }
}
)

module.exports = contentRouter