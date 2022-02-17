const dotenv = require('dotenv').config()
const express = require('express')
const multer  = require('multer')
const PORT = process.env.PORT || 5000
const server = express()

server.use(express.json())
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 },
  }).array("docs", 10); 

server.post("/uploads",(req,res)=>{
    
})

server.get("/api",(req,res)=>{
    res.json({message: "Uploader"});
})
server.listen(PORT, ()=>{
    console.log("Server Iniciado")
})
