import "bootstrap/dist/css/bootstrap.min.css"
import Axios from "axios"
import fileDownload from 'js-file-download'

function Card({ title }) {
    const link = "/download/" + title
    var extension = ""
    var imagen = "/public/img.jpg"
    if (title != title.split(".").pop()) {
        extension = title.split(".").pop()
    }
    const s = extension !== ""
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
            imagen = "/public/pdf.svg"
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
        Axios({
            url: link,
            method: "GET",
            responseType: "blob"
        }).then((res) => {
            console.log(res.data)
            fileDownload(res.data, title)
        })
    }
    return (
        <div className="card text-center bg-dark">
            <img src={imagen} alt="" />
            <div className="card-body text-light">
                <h6 className="card-title">{title}</h6>
            </div>{s &&
                <a onClick={download} className="btn btn-outline-primary">Download</a>
            }
        </div>

    )

}

export default Card
