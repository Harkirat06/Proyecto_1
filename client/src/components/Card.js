import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from "react"
import { deleteFiles, downloadFile } from "./Axios"
import { BsCloudDownloadFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md"
import "./Card.css"

function Card({ title, context, directory }) {
    const { setPath, path , setRefrescar, refrescar} = useContext(context)
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
    const download = () => {
        downloadFile(title, path + "/" + title, directory)
    }
    const deleteFile = ()=>{
        deleteFiles(path + "/" + title).then((res)=>setRefrescar(prev=> prev + 1))
    }
    return (
        <div className="card text-center bg-dark" onDoubleClick={() => {
            setPath(prev => prev + "/" + title)
        }}>
            <img src={imagen} className="card-img-top" alt="" />
            <div className="card-body text-light">
                <h6 className="card-title" data-toggle="tooltip" data-placement="right" title={title}>{title}</h6>
            </div>
            <div className="card-footer">
               <button type="button" style={{marginRight:20}} className="btn btn-primary" onClick={download}><h6><BsCloudDownloadFill/></h6></button>
               <button type="button" className="btn btn-danger" onClick={deleteFile}><h6><MdDelete/></h6></button>
            </div>
        </div>

    )

}

export default Card
