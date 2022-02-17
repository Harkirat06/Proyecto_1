const dotenv = require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const server = express()

server.use(express.json())

server.get("/api",(req,res)=>{
    res.json({message: "Hello World"});
})
server.listen(PORT, ()=>{
    console.log("Server Iniciado")
})
