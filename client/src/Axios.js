import axios from 'axios'
import { useState } from 'react'

export const Titulo = ()=> {
    const [mensaje,setMensaje] = useState("")
    const [archivos,setArchivos] = useState("")
    axios.get("/api").then(response => {
        const {data} = response
        setMensaje(data.message) 
      })
      axios.get("/content").then(response=>{
        const{data} = response
        setArchivos(data)
      })
      return [mensaje,archivos]
}


