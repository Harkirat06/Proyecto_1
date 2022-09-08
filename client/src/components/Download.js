import React, { useContext } from 'react'
import { ProgressBar, Button, Modal, Card } from 'react-bootstrap'
import { ImCancelCircle } from "react-icons/im"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NotFound.css"


export default function Download(props) {
    const { context } = props
    const { download, setDownload } = useContext(context)
    let i = 0
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Downloading Files
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>{download &&
                        download.map(file => {
                            return (
                                <div key={i++} style={{ marginBottom: "10px" }}>
                                    <Card bg={"dark"} text={"light"}>
                                        <Card.Body>
                                            <Card.Title>{file.titulo}</Card.Title>
                                            <ProgressBar animated now={file.progreso} label={`${file.progreso}%`} />
                                        </Card.Body>
                                        <Card.Footer>
                                            <div className="d-grid gap-2">
                                                <Button variant="outline-danger" onClick={()=>{
                                                    file.controller.abort()
                                                    let arr = download.filter((item) => item.titulo !== file.titulo)
                                                    setDownload(arr)
                                                }}><ImCancelCircle className='icon' /> Cancel</Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            )
                        }
                        )
                    }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
