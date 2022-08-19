const multer = require('multer')
const uploaderRouter = require("express").Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(
        null,
        "." + req.query.path
      );
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname
      );
    },
  })

  const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 },
  })

  uploaderRouter.post("/", upload.array('docs'), async (req, res,next) => {
    const { files } = req
    console.log(files)
    if (!files) {
      res.sendStatus(404)
    } else {
      res.sendStatus(200)
    }
  })
  module.exports = uploaderRouter

