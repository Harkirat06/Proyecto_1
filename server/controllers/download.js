const downloadRouter = require("express").Router()
const AdmZip = require("adm-zip")
const del = require('del')
const tokenExtractor = require("../middlewares/tokenExtractor")
const tar = require("tar")
const fs = require("fs")
const { title } = require("process")

async function eliminarArchivos(path) {
  await del([path])
}


downloadRouter.get("/", tokenExtractor, async (req, res, next) => {
  if (req.query.directory !== "false") {
    const p = "." + req.query.path
    const title = req.query.title
    const final = p+"/"+title
    console.log(final)
    tar.c(
      {
        gzip: true // this will perform the compression too
      },
      [final]
    ).pipe(fs.createWriteStream(title + ".tgz")).addListener("finish",()=>{
      res.download("./" + title + ".tgz", (err) => {
        next(err)
      })
      eliminarArchivos(title + ".tgz")
    })

  } else {
    res.download("." + req.query.path + "/" + req.query.title, (err) => {
      next(err)
    })
  }
})

module.exports = downloadRouter