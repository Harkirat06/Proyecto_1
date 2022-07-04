import {useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "./Card"

function Cards({archivos}) {
    const nombres = []
    const ar = []
    let i = 0
    if(archivos.length!=0){
    for(let i =0; i < archivos.length; i++){
        nombres.push(archivos[i])
    }
    nombres.map((objeto)=> ar.push({
        id: i++,
        name: objeto.filename}))
    }
    
    return (
        <div className="container d-flex justify-content-center align-items-center h-100">
           <div className="row gy-4">
                {
                    ar.map(titulo=>(
                        <div className="col-md-2" key={titulo.id}><Card title={titulo.name} /></div>
                    ))
                    
                }
           </div>
        </div>

    )

}

export default Cards