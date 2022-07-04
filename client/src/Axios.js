import axios from 'axios'
import { useState, useEffect } from 'react'

export function Titulos() {
  const [mensaje,setMensaje] = useState("")
  useEffect(()=>{
    axios.get("http://localhost:3001/api").then(response => {
    const {data} = response
    setMensaje(data.message)  
  })
  },[])
  
  return mensaje
}

export function Archivos(){
  const [archivos,setArchivos] = useState("")
  useEffect(()=>{
    axios.get("http://localhost:3001/content").then(response=>{
    const{data} = response
    setArchivos(data)
  })
  },[])
  return archivos
}
