import { useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "./Card"

function Cards({ context }) {
    const { archivos, setRefrescar, setPath, path } = useContext(context)
    let i = 0
    return (
        <div>
            <div>
                <button type="button" style={{ margin: 20 }} className="btn btn-primary" onClick={() => {
                    let index = path.lastIndexOf("/")
                    let cadena = path.substring(0, index)
                    console.log(cadena)
                    setPath(cadena)
                    setRefrescar(prev=>prev + 1)
                }}>Subir</button>
                <button type="button" style={{ margin: 20 }} className="btn btn-primary" onClick={() => setRefrescar(prev => prev + 1)}>Recargar</button></div>
            <div className="container justify-content-center align-items-center">
                <div className="row g-4">
                    {archivos &&
                        archivos.map(titulo => (
                            <div className="col-12 col-md-6 col-lg-2 d-flex align-items-stretch" key={i++}><Card title={titulo.filename} directory={titulo.isDirectory} context={context} /></div>
                        ))

                    }
                </div>
            </div>
        </div>

    )

}

export default Cards