const dotenv = require('dotenv').config()
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const JSZip = require('jszip')
const { Console } = require('console')
const PORT = process.env.PORT || 5000
const server = express()

server.use(express.json())

const createZip = (path, title, cb) => {
  const zip = new JSZip()
  try {
    const data = []
    lista("." + path, data)
    for (const archivo of data) {
      const archivoData = fs.readFileSync("." + path + "/" + archivo.filename);
      zip.file(archivo.filename, archivoData);
    }
    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(title + '.zip'))
      .on('finish', function () {
        console.log("sample.zip written.");
      });
    cb(null)
  } catch (err) {
    console.error(err)
  }
}

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
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000 },
});

const lista = (dirPath, data) => {
  try {
    var ls = fs.readdirSync(dirPath)
    for (let i = 0; i < ls.length; i++) {
      const file = path.join(dirPath, ls[i])
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

server.post("/uploadFile", upload.array('docs'), async (req, res) => {
  const { files } = req
  console.log(files)
  if (!files) {
    res.sendStatus(404)
  } else {
    res.sendStatus(200)
  }
})
server.get("/content", (req, res) => {
  const path = req.query.path
  if (path !== "") {
    const data = []
    lista("." + path, data)
    res.json(data);
  } else {
    console.log("NO nO nO")
  }
})

server.get("/download", (req, res) => {
  if (req.query.directory) {
    const path = req.query.path
    const title = req.query.title
    const zip = new JSZip()
    try {
      const data = []
      lista("." + path, data)
      for (const archivo of data) {
        const archivoData = fs.readFileSync("." + path + "/" + archivo.filename);
        zip.file(archivo.filename, archivoData);
      }
      zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(title + '.zip'))
        .on('finish', function () {
          console.log("sample.zip written.");
          res.download("./" + req.query.title + ".zip", (err) => {
            if (err) {
              console.log(err)
            }
          })
        });
    } catch (err) {
      console.error(err)
    }
  } else {
    res.download("." + req.query.path, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
})

server.get("/public/:id", (req, res) => {
  res.sendFile(__dirname + "/public/" + req.params.id)
})

server.listen(PORT, () => {
  console.log("Server Iniciado")
})
