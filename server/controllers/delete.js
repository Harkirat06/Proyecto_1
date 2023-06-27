const deleteRouter = require("express").Router()
const del = require('del')
const tokenExtractor = require("../middlewares/tokenExtractor")



async function eliminarArchivos(path){
    await del([path])
}

deleteRouter.delete("/",tokenExtractor,(req,res,next)=>{
    const path = "." + req.query.path
    console.log("Estoy eliminando " + path)
      eliminarArchivos(path)
    res.sendStatus(200)
  })

module.exports = deleteRouter
