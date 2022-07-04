import react from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import img from "./img.jpg"

function Card({title}) {
    return (
        <div className="card text-center bg-dark">
            <img src={img} alt="" />
            <div className="card-body text-light">
                <h6 className="card-title">{title}</h6>
                 <a href="#!" className="btn btn-outline-primary">Download</a>
            </div>
        </div>

    )

}

export default Card
