import React, { useContext } from 'react'
import { ProgressBar, Button, Modal, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"


export default function Download(props) {
    const { context } = props
    const { download} = useContext(context)
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
                                <div key={i++} style={{marginBottom:"10px"}}>
                                    <Card bg={"dark"} text={"light"}>
                                        <Card.Body>
                                            <Card.Title>{file.titulo}</Card.Title>
                                            <ProgressBar animated now={file.progreso} label={`${file.progreso}%`} />
                                        </Card.Body>
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
