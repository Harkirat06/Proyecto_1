import React, { useContext, useEffect, useState } from 'react'
import { ProgressBar, Button, Modal, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import CardDownload from './CardDownload'

export default function Download(props) {
    const { download, context} = props
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
                        download.map(file =>{
                            return (
                                <div key={i++}>
                                    <CardDownload titulo={file.titulo} progres={file.progreso} context={context}/> 
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
