const deleteRouter = require("express").Router()
const del = require('del')


async function eliminarArchivos(path){
    const deletedFilePaths = await del([path])
}

deleteRouter.delete("/",(req,res,next)=>{
    const path = "." + req.query.path
    console.log("Estoy eliminando " + path)
    eliminarArchivos(path)
    res.sendStatus(200)
  })

module.exports = deleteRouter
