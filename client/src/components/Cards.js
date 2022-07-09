import { useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "./Card"

function Cards({ context }) {
    const { archivos } = useContext(context)
    const {setRefresh} = useContext(context)
    let i = 0
    return (
        <div>
            <div><button type="button" style={{margin: 20}} className="btn btn-primary" onClick={() => setRefresh(prev => prev + 1)}>Recargar</button></div>
            <div className="container justify-content-center align-items-center">
                <div className="row gy-4">
                    {archivos &&
                        archivos.map(titulo => (
                            <div className="col-md-2" key={i++}><Card title={titulo.filename} /></div>
                        ))

                    }
                </div>
            </div>
        </div>

    )

}

export default Cards