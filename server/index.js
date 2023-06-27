require("./mongoose")
require('dotenv').config()
const express = require('express')
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const uploaderRouter = require("./controllers/uploader")
const downloadRouter = require("./controllers/download")
const deleteRouter = require("./controllers/delete")
const contentRouter = require("./controllers/content")
const streamingRouter = require("./controllers/streaming")
const dirRouter = require("./controllers/dir")
const errorHandler = require("./middlewares/hadleErrors")
const compression = require('compression')
const zlib = require('zlib')

const PORT = process.env.PORT || 5000

const server = express()

server.use(compression())

server.use(express.json())

server.use("/api/content", contentRouter)
server.use("/api/users", usersRouter)
server.use("/api/login", loginRouter)
server.use("/api/uploadFile", uploaderRouter)
server.use("/api/download", downloadRouter)
server.use("/api/delete", deleteRouter)
server.use("/api/createDir", dirRouter)
server.use("/api/video", streamingRouter)
server.use("/api/public", express.static("public"))
server.use(errorHandler)
server.listen(PORT,() => {
  console.log("Server Iniciado")
})
