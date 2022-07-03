import axios from 'axios'
import { useState } from 'react'

export const Titulo = ()=> {
    const [mensaje,setMensaje] = useState("")
    axios.get("/api").then(response => {
        const {data} = response
        setMensaje(data.message) 
      })
      axios.get("/content").then(response=>{
        const{data} = response
        const archivos = data
      })
      return mensaje,archivos
}


