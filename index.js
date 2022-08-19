require("./mongoose")
require('dotenv').config()
const express = require('express')
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const uploaderRouter = require("./controllers/uploader")
const downloadRouter = require("./controllers/download")
const deleteRouter = require("./controllers/delete")
const contentRouter = require("./controllers/content")
const dirRouter = require("./controllers/dir")

const PORT = process.env.PORT || 5000

const server = express()

server.use(express.json())


server.get("/public/:id", (req, res,next) => {
  res.sendFile(__dirname + "/public/" + req.params.id)
})

server.use("/content", contentRouter)
server.use("/users", usersRouter)
server.use("/login", loginRouter)
server.use("/uploadFile", uploaderRouter)
server.use("/download", downloadRouter)
server.use("/delete", deleteRouter)
server.use("/createDir", dirRouter)
server.listen(PORT,() => {
  console.log("Server Iniciado")
})
