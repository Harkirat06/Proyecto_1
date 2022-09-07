import React, { useContext } from 'react'
import { ProgressBar, Button,Card, Modal } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import Dropzone from "react-dropzone"
import "./Uploader.css"


export default function Uploader(props) {
    const {setFinish, progress, setProgress, setRefrescar,
        doc, setDoc, setError, path, token } = useContext(props.context)
        let i = 0
    const onDrop = (acceptedFiles) => {
        setDoc(acceptedFiles)
    }

    const onClick = (e) => {
        e.preventDefault()
        if (doc) {
            const arr = Array.from(doc)
            const data = new FormData()
            arr.map((file) => {
                data.append("docs", file)
            })
            axios.post("/uploadFile", data, {
                onUploadProgress: data => {
                    setProgress(Math.round((100 * data.loaded) / data.total))
                },
                headers: { "Authorization": `Bearer ${token}` },
                params: {
                    path: path
                }
            }).then(() => {
                setFinish(true)
                setRefrescar(prev => prev + 1)
                props.onHide()
                setProgress(0)
                setDoc(null)
            })
        } else {
            setError(true)
            setDoc(null)
            props.onHide()
        }
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload Files
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="page">
                        <Dropzone id="form-file-upload" onDrop={onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} id="drag-file-element">
                                        <input {...getInputProps()} id="input-file-upload" />
                                        <label id="label-file-upload">Drag your files here</label>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Body>
                {doc &&
                    doc.map(file => {
                        return (
                            <div key={i++} style={{marginBottom: "10px"}}>
                                <Card bg={"dark"} text={"light"}>
                                    <Card.Body>
                                        <Card.Subtitle>{file.name}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
                <div>
                    <ProgressBar animated now={progress} label={`${progress}%`} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClick}>Subir</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
