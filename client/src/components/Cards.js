import { useContext, useEffect, useState } from "react"
import { Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "./Card"
import { AiOutlineReload } from "react-icons/ai"
import { FaLevelUpAlt } from "react-icons/fa"
import { MdCreateNewFolder } from "react-icons/md"
import { BsFillCloudUploadFill, BsDownload } from "react-icons/bs"
import { makeDir, getContent } from "./Axios"
import { useNavigate } from "react-router-dom"
import { googleLogout } from '@react-oauth/google'
import Uploader from "./Uploader"
import Download from "./Download"
import VideoPlayer from "./VideoPlayer"


function Cards({ context }) {
    const { archivos, setRefrescar, setPath, path, setArchivos, refrescar, token,
        error, setError, finish, setFinish, showUpload, setShowUpload,
        showDownload, setShowDownload, setShowVideo, showVideo } = useContext(context)
    const navigate = useNavigate()

    useEffect(() => {
        if (token !== undefined && token !== null) {
            const content = async () => {
                const { dat, newPath } = await getContent(path, token)
                console.log(dat)
                if (dat === "Token Expired") {
                    localStorage.removeItem("token")
                    navigate("/")
                } else {
                    setArchivos(dat)
                    setPath(newPath)
                }
            }
            content()
        } else {
            navigate("/")
        }
    }, [refrescar, path])

    useEffect(() => {
        const remind = localStorage.getItem("remind")
        if (remind === "false") {
            window.onbeforeunload = (event) => {
                window.localStorage.removeItem("token")
                googleLogout()
                console.log(event)
                event.returnValue = ""
            }
        }
    }, [])
    let i = 0
    const subir = () => {
        let index = path.lastIndexOf("/")
        let cadena = path.substring(0, index)
        console.log(cadena)
        setPath(cadena)
        setRefrescar(prev => prev + 1)
    }
    const crearCarpeta = () => {
        makeDir(path, token)
        setRefrescar(prev => prev + 1)
    }
    const input = {
        margin: 20
    }
    return (
        <div>
            <div className="Alerta">
                {error &&
                    <Alert key={'danger'} variant={'danger'} onClose={() => setError(false)} dismissible style={input}>
                        No has seleccionado ningún archivo!!
                    </Alert>
                }
                {finish &&
                    <Alert key={'primary'} variant={'primary'} onClose={() => setFinish(false)} dismissible style={input}>
                        Subida finalizada con exito!!
                    </Alert>
                }
            </div>
            <Uploader
                show={showUpload}
                onHide={() => {
                    setShowUpload(false)
                }}
                context={context}
            />
            <Download
                show={showDownload}
                onHide={() => {
                    setShowDownload(false)
                }}
                context={context}
            />
            <VideoPlayer
                show={showVideo}
                onHide={() => {
                    setShowVideo(false)
                }}
                context={context}
            />
            <div style={{ margin: 20 }}>
                <button type="button" className="btn btn-primary" onClick={subir}>
                    <h4><FaLevelUpAlt style={{ verticalAlign: "middle" }} /></h4>
                </button>
                <button style={{ marginLeft: 20 }} type="button" className="btn btn-info" onClick={crearCarpeta}>
                    <h4><MdCreateNewFolder /></h4>
                </button>
                <button type="button" style={{
                    overflow: "hidden",
                    float: "right",
                    marginLeft: 20
                }} className="btn btn-primary" onClick={() => {
                    setRefrescar(prev => prev + 1)
                }}>
                    <h5><AiOutlineReload style={{ verticalAlign: "middle", marginTop: "8px" }} /></h5>
                </button>
                <button type="button" style={{
                    overflow: "hidden",
                    float: "right",
                    marginLeft: 20
                }} className="btn btn-primary" onClick={() => setShowUpload(true)}>
                    <h5><BsFillCloudUploadFill style={{ verticalAlign: "middle", marginTop: "8px" }} /></h5>
                </button>
                <button type="button" style={{
                    overflow: "hidden",
                    float: "right"
                }} className="btn btn-primary" onClick={() => {
                    setShowDownload(true)
                    console.log("Descargas")
                }}>
                    <h5><BsDownload style={{ verticalAlign: "middle", marginTop: "8px" }} /></h5>
                </button>
            </div>
            <div>
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