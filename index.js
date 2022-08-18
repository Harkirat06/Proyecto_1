require("./mongoose")
const dotenv = require('dotenv').config()
const express = require('express')
const multer = require('multer')
const jwt = require("jsonwebtoken")
const p = require('path')
const fs = require('fs')
const del = require('del')
const AdmZip = require("adm-zip")
const PORT = process.env.PORT || 5000
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const server = express()

server.use(express.json())
var n = 1

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

server.post("/uploadFile", upload.array('docs'), async (req, res,next) => {
  const { files } = req
  console.log(files)
  if (!files) {
    res.sendStatus(404)
  } else {
    res.sendStatus(200)
  }
})
server.get("/content", (req, res,next) => {
  const path = req.query.path
  const authorization = req.get("authorization")
  let token = null
  if(authorization && authorization.toLowerCase().startsWith("bearer")){
    token = authorization.substring(7)
  }
  if(token){
    const decodedToken = jwt.verify(token, process.env.TOKEN)
    if (path !== "") {
      const data = []
      lista("." + path, data)
      res.json(data);
    }
  }else{
    res.status(403).json([])
  }
})

server.get("/download", async(req, res,next) => {
  if (req.query.directory) {
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

server.delete("/delete",(req,res,next)=>{
  const path = "." + req.query.path
  console.log("Estoy eliminando " + path)
  eliminarArchivos(path)
  res.sendStatus(200)
})

server.get("/public/:id", (req, res,next) => {
  res.sendFile(__dirname + "/public/" + req.params.id)
})
server.post("/createDir",(req,res,next)=>{
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
server.use("/users", usersRouter)
server.use("/login", loginRouter)
server.listen(PORT,() => {
  console.log("Server Iniciado")
})
