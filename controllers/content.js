const contentRouter = require("express").Router()
const User = require("../models/Users")
const p = require('path')
const fs = require('fs')
const tokenExtractor = require("../middlewares/tokenExtractor")

const lista = (dirPath, data) => {
  try {
    var ls = fs.readdirSync(dirPath)
    for (let i = 0; i < ls.length; i++) {
      const file = p.join(dirPath, ls[i])
      var dataFile = null
      try {
        dataFile = fs.lstatSync(file)
      } catch (error) { }

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
  } catch (e) { }
}

contentRouter.get("/", tokenExtractor, async (req, res,next) => {
    const path = req.query.path
    const {userId} = req
    const user = await User.findById(userId)
    if (path !== "") {
        const data = []
        lista("." + path, data)
        res.json(data);
      }
    }
  )

module.exports = contentRouter