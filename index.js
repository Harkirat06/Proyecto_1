const dotenv = require('dotenv').config()
const express = require('express')
const multer  = require('multer')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 5000
const server = express()

server.use(express.json())

const storage = multer.diskStorage({
    /*destination: function(req, cb){
      let t = req.query.path;
      console.log(t)
      let path = "." + t;
      cb(null, path);
    },*/
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

  const lista = (dirPath,data)=>{
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
                "length": dataFile.size,
             });
  
          /*if(dataFile.isDirectory()){
             lista(file)
          }*/
       }
      }
    }catch(e){}
  }

server.post("/uploadFile",upload.array('docs'), async (req,res) => {
  const {files} = req
  console.log(files)  
  if(!files){
      res.sendStatus(404)
    }else{
      res.sendStatus(200)
    }
})
server.get("/content",(req,res)=>{
  const path = req.query.path
  if(path!==""){
  const data = []
  lista("." + path,data)
  res.json(data);
  }
})

server.get("/download/:id", (req,res) =>{
  res.download("./uploads/" + req.params.id,req.params.id, (err)=>{
    if(err){
      console.log(err)
    }
  })
})

server.get("/public/:id",(req,res)=>{
  res.sendFile( __dirname +  "/public/" + req.params.id)
})

server.listen(PORT, ()=>{
    console.log("Server Iniciado")
})
