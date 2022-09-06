import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Video.css"


export default function VideoPlayer(props) {
    const {context, titulo} = props
    return (
    <div>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {titulo}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="page">
                    <video controls muted>
                        <source src={`/video/${titulo}`} type="video/mp4"></source>
                    </video>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

