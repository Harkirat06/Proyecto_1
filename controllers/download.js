const downloadRouter = require("express").Router()
const AdmZip = require("adm-zip")
const del = require('del')

async function createZipArchive(title, path) {
    const zip = new AdmZip();
    const outputFile = title;
    zip.addLocalFolder(path);
    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
  }

  async function eliminarArchivos(path){
    const deletedFilePaths = await del([path])
}


  downloadRouter.get("/", async(req, res,next) => {
    if (req.query.directory!=="false") {
      const p = "." + req.query.path
      const title = req.query.title + ".zip"
      console.log(title)
      createZipArchive(title,p).then(()=>{
        res.download("./" + title, (err) => {
          if (err) {
            console.log(err)
          }
        })
        eliminarArchivos(title)
      })
    } else {
      res.download("." + req.query.path, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })

module.exports = downloadRouter