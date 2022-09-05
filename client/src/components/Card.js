import "bootstrap/dist/css/bootstrap.min.css"
import { useContext, useEffect, useState } from "react"
import { deleteFiles } from "./Axios"
import Axios from "axios"
import fileDownload from 'js-file-download'
import { BsCloudDownloadFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md"
import { Dropdown, Button } from "react-bootstrap"
import "./Card.css"
import "./NotFound.css"
import Download from "./Download"

function Card({ title, context, directory }) {
    const { setPath, path, setRefrescar, token, download, setDownload, showDownload, setShowDownload } = useContext(context)
    const [progress, setProgress] = useState(0)
    var extension = ""
    var imagen = "/public/img.jpg"
    if (title != title.split(".").pop()) {
        extension = title.split(".").pop()
    }
    switch (extension) {
        case "mp3":
            imagen = "/public/mp3.png"
            break
        case "rar":
            imagen = "/public/rar.jpg"
            break
        case "zip":
            imagen = "/public/zip.jpg"
            break
        case "exe":
            imagen = "/public/exe.png"
            break
        case "":
            imagen = "/public/carpeta.png"
            break
        case "mp4":
            imagen = "/public/video.png"
            break
        case "avi":
            imagen = "/public/video.png"
            break
        case "pdf":
            imagen = "/public/pdf.png"
            break
        case "docx":
            imagen = "/public/word.png"
            break
        case "png":
            imagen = "/public/imagen.png"
            break
        case "jpg":
            imagen = "/public/imagen.png"
            break
        case "jpeg":
            imagen = "/public/imagen.png"
            break
    }
    useEffect(() => {
        if (download.length !== 0) {
           const index = download.findIndex(file=>{
                return file.titulo === title
            })
            download[index].progreso = progress
           setDownload([...download])
        }
    }, [progress])
    const downloadClick = async () => {
        setDownload([...download, { titulo: title, progreso: 0 }])
        setShowDownload(true)
        await Axios({
            url: "/download",
            method: "GET",
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
            },
            headers: { "Authorization": `Bearer ${token}` },
            params: {
                title: title,
                path: path,
                directory: directory
            }
        }).then((res) => {
            console.log(res.data)
            if (directory) {
                fileDownload(res.data, title + ".tgz")
            } else {
                fileDownload(res.data, title)
            }
        })
    }
    const deleteFile = () => {
        deleteFiles(path + "/" + title, token).then((res) => {
            setRefrescar(prev => prev + 1)
        })
    }
    return (
        <div>
            <Download
                show={showDownload}
                onHide={() => {
                    setShowDownload(false)
                }}
                context={context}
                progress={progress}
            />
            <div className="card text-center bg-dark">
                <img src={imagen} className="card-img-top" alt="" onDoubleClick={() => {
                    setPath(prev => prev + "/" + title)
                }} />
                <div className="card-body text-light">
                    <h6 className="card-title" data-toggle="tooltip" data-placement="right" title={title}>{title}</h6>
                </div>
                <div className="card-footer">
                    <Button variant="outline-primary" onClick={downloadClick}><BsCloudDownloadFill className="icon" /></Button>
                    <Dropdown style={{
                        float: "right"
                    }} key="end" drop="end" >
                        <Dropdown.Toggle variant="link" bsPrefix="p-0">
                            <h4><BsThreeDotsVertical /></h4>
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item id="delete" as="button" onClick={deleteFile}><MdDelete className="icon" /> Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )

}

export default Card
