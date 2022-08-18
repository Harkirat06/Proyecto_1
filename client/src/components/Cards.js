import { useContext, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "./Card"
import { AiOutlineReload } from "react-icons/ai"
import { FaLevelUpAlt } from "react-icons/fa"
import { MdCreateNewFolder } from "react-icons/md"
import { makeDir, getContent } from "./Axios"

function Cards({ context }) {
    const { archivos, setRefrescar, setPath, path, setArchivos, refrescar} = useContext(context)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmU3NWNlNmQ4Y2Q2YWM5ZjU1NmVhOCIsInVzZXJuYW1lIjoiIiwiaWF0IjoxNjYwODQ3ODgwfQ.RkyLGiN7Vyg-TOxD1GIv_xrzfG-EwcsHyLdJtgiuzsg"
    useEffect(async () => {
        const {dat, newPath} = await getContent(path, token)
        setArchivos(dat)
        setPath(newPath)
    }, [refrescar, path])
    let i = 0
    const subir = () => {
        let index = path.lastIndexOf("/")
        let cadena = path.substring(0, index)
        console.log(cadena)
        setPath(cadena)
        setRefrescar(prev => prev + 1)
    }
    const crearCarpeta = ()=>{
        makeDir(path)
        setRefrescar(prev => prev + 1) 
    }
    return (
        <div>
            <div style={{ margin: 20 }}>
                <button type="button" className="btn btn-primary" onClick={subir}>
                    <h4><FaLevelUpAlt style={{verticalAlign: "middle"}} /></h4>
                </button>
                <button style={{marginLeft:20}} type="button" className="btn btn-info" onClick={crearCarpeta}>
                    <h4><MdCreateNewFolder /></h4>
                </button>
                <button type="button" style={{
                    overflow: "hidden",
                    float: "right"
                }} className="btn btn-primary" onClick={() => setRefrescar(prev => prev + 1)}>
                    <h4><AiOutlineReload style={{verticalAlign: "middle"}} /></h4>
                </button>
            </div>
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