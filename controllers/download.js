const downloadRouter = require("express").Router()
const AdmZip = require("adm-zip")
const del = require('del')
const tokenExtractor = require("../middlewares/tokenExtractor")


async function createZipArchive(title, path, next) {
    const zip = new AdmZip();
    const outputFile = title;
    try {
      zip.addLocalFolder(path)
      zip.writeZip(outputFile)
    } catch (error) {
      next(error)
    }
  }

  async function eliminarArchivos(path){
    await del([path])
}


  downloadRouter.get("/", tokenExtractor,async(req, res,next) => {
    if (req.query.directory!=="false") {
      const p = "." + req.query.path
      const title = req.query.title
        createZipArchive(title,p, next).then(()=>{
          res.download("./" + title, (err) => {
            next(err)
          })
          eliminarArchivos(title)
        })
    } else {
      res.download("." + req.query.path, (err) => {
        next(err)
      })
    }
  })

module.exports = downloadRouter