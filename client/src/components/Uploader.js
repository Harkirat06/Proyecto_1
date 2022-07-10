import React, { useContext } from 'react'
import { ProgressBar, Button, Form, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'


export default function Uploader({ context }) {
    const { finish, setFinish, progress, setProgress, setRefrescar,
        doc, setDoc, error, setError, path } = useContext(context)
    const OnClick = (e) => {
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
                params:{
                    path: path
                }
            }).then(() => {
                setFinish(true)
                setRefrescar(prev => prev + 1)
                setTimeout(() => { setProgress(0) }, 5000)
            })
        } else {
            setError(true)
        }
    }
    const onChange = (e) => {
        setDoc(e.target.files)
    }
    const input = {
        margin: 20
    }

    return (
        <div>
            <div className="Alerta">
                {error > 0 &&
                    <Alert key={'danger'} variant={'danger'} onClose={() => setError(false)} dismissible style={input}>
                        No has seleccionado ningún archivo!!
                    </Alert>
                }
                {finish > 0 &&
                    <Alert key={'primary'} variant={'primary'} onClose={() => setFinish(false)} dismissible style={input}>
                        Subida finalizada con exito!!
                    </Alert>
                }
            </div>
            <div>
                <Form.Group controlId="formFileMultiple" className="mb-3" style={input}>
                    <Form.Control type="file" onChange={onChange} /*webkitdirectory="true"*/ multiple />
                    <div className="d-grid gap-2" style={{ marginTop: 20 }}>
                        <Button variant="primary" size="lg" onClick={OnClick}>
                            Enviar
                        </Button>
                    </div>
                </Form.Group>
            </div>
            <div style={input}>
                <ProgressBar animated now={progress} label={`${progress}%`} />
            </div>
        </div>
    )
}

