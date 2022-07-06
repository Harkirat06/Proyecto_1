import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "./Card"

function Cards({archivos}) {
    const [documentos,setDocumentos] = useState([])
    useEffect(()=>setDocumentos(archivos),[archivos])
    let i = 0
    return (
        <div className="container justify-content-center align-items-center">
           <div className="row gy-4">
                {   documentos&&
                    documentos.map(titulo=>(
                        <div className="col-md-2" key={i++}><Card title={titulo.filename} /></div>
                    ))
                    
                }
           </div>
        </div>

    )

}

export default Cards