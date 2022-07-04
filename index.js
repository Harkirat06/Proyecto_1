const dotenv = require('dotenv').config()
const express = require('express')
const multer  = require('multer')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 5000
const server = express()
const cors = require("cors")

server.use(express.json())

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
server.use(cors(corsOptions))

const storage = multer.diskStorage({
    destination: "uploads/",
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

server.post("/uploadFile",upload.array('docs',10), async (req,res,next) => {
  const {files} = req
  console.log(files)  
  if(!files){
      res.sendStatus(404)
    }else{
      res.sendStatus(200)
    }
})

server.get("/api",(req,res)=>{
    res.json({message: "YourCloud"});
})

const data = []

const lista = (dirPath)=>{
  try{
    var ls = fs.readdirSync(dirPath)
    for(let i = 0; i<ls.length; i++){
      const file = path.join(dirPath, ls[i])
      var dataFile = null
      try {
        dataFile=fs.lstatSync(file)
      } catch (error) { }

      if(dataFile){
        data.push(
           {
              "path": file,
              "filename": ls[i],
              "isDirectory": dataFile.isDirectory(),
              "length": dataFile.size
           });

        if(dataFile.isDirectory()){
           lista(file)
        }
     }
    }
  }catch(e){}
}
lista("./uploads");
console.log(data)
server.get("/content",(req,res)=>{
  res.json(data);
})

server.listen(PORT, ()=>{
    console.log("Server Iniciado")
})
