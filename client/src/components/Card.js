import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from "react"
import { deleteFiles, downloadFile } from "./Axios"
import { BsCloudDownloadFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md"
import { Dropdown, Button } from "react-bootstrap"
import "./Card.css"

function Card({ title, context, directory }) {
    const { setPath, path, setRefrescar, token } = useContext(context)
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
        downloadFile(title, path + "/" + title, directory, token)
    }
    const deleteFile = () => {
        deleteFiles(path + "/" + title, token).then((res) => {
            setRefrescar(prev => prev + 1)
        })
    }
    return (
        <div className="card text-center bg-dark">
            <img src={imagen} className="card-img-top" alt="" onDoubleClick={() => {
            setPath(prev => prev + "/" + title)
        }}/>
            <div className="card-body text-light">
                <h6 className="card-title" data-toggle="tooltip" data-placement="right" title={title}>{title}</h6>
            </div>
            <div className="card-footer">
                <Button style={{display:"inline"}} variant="outline-primary" onClick={download}><h6><BsCloudDownloadFill /></h6></Button>
                <Dropdown style={{
                    float: "right"
                }} key="end" drop="end" >
                    <Dropdown.Toggle variant="link" bsPrefix="p-0">
                        <h4><BsThreeDotsVertical /></h4>
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item id="delete" as="button" onClick={deleteFile}><h5 style={{display:"inline"}}><MdDelete /></h5> Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>

    )

}

export default Card
