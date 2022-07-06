import axios from 'axios'
import { useState, useEffect } from 'react'

export function Titulos() {
  const [mensaje,setMensaje] = useState("")
  useEffect(()=>{
    axios.get("/api").then(response => {
    const {data} = response
    setMensaje(data.message)  
  })
  },[])
  
  return mensaje
}

export function Archivos(){
  const [archivos,setArchivos] = useState("")
  useEffect(()=>{
    axios.get("/content").then(response=>{
    const{data} = response
    setArchivos(data)
  })
  },[])
  return archivos
}
