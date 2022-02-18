const dotenv = require('dotenv').config()
const express = require('express')
const multer  = require('multer')
const path = require('path')
const PORT = process.env.PORT || 5000
const server = express()

server.use(express.json())

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
    res.json({message: "Uploader"});
})
server.listen(PORT, ()=>{
    console.log("Server Iniciado")
})
