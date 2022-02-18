import axios from 'axios';
import { useState } from 'react';
import {ProgressBar,Button,Form} from 'react-bootstrap'

function App() {
  const [mensaje,setMensaje] = useState("")
  const [doc,setDoc] = useState(null)
  const [progress,setProgress] = useState(0)
  
  const onClick = (e) => {
    e.preventDefault()
    const arr = Array.from(doc)
    console.log(arr)
    const data = new FormData()
    arr.map((file)=>{
    data.append("docs",file)
    })
    axios.post("/uploadFile", data,{onUploadProgress: data => {
      setProgress(Math.round((100 * data.loaded) / data.total))
    }}).then((res) => console.log(res))
  }
  const onChange = (e)=>{
    setDoc(e.target.files)
  }
  
  axios.get("/api").then(response => {
    const {data} = response
    setMensaje(data.message) 
  })
  const title ={
    textAlign: "center",
    fontWeight: "bold",
    color: "#0d6efd",
    margin: 20
  }
  const input= {
    margin: 20
  }

  return (
    <div className="Upload">
      <div className='Title' style={title} >
      <h1>{mensaje}</h1>
      </div>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Control type="file" style={input} onChange={onChange} multiple />
        <div className="d-grid gap-2" style={input}>
          <Button variant="primary" size="lg" onClick={onClick}>
            Enviar
          </Button>
        </div>
      </Form.Group>
      <div style={input}>
      <ProgressBar animated now={progress} label={`${progress}%`} />
      </div>
    </div>
  );
}

export default App;
