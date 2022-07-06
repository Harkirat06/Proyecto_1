import axios from 'axios'
import { useState, useEffect } from 'react'
import {ProgressBar,Button,Form,Alert} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Cards from "./Cards"
import {Archivos} from "./Axios"
function App() {
  
  const [doc,setDoc] = useState(null)
  const [progress,setProgress] = useState(0)
  const [error,setError] = useState(false)
  const [finish,setFinish] = useState(false)

  const onClick = (e) => {
    e.preventDefault()
    if(doc){
    const arr = Array.from(doc)
    const data = new FormData()
    arr.map((file)=>{
    data.append("docs",file)
    })

    axios.post("/uploadFile", data,{onUploadProgress: data => {
      setProgress(Math.round((100 * data.loaded) / data.total))
    }}).then((res) => {
      console.log(res)
      setFinish(true)
      setTimeout(()=>{setProgress(0)}, 5000)
    })
   }else{
      setError(true)
   }
  }

  const onChange = (e)=>{
    setDoc(e.target.files)
  }
  
  const title ={
    textAlign: "center",
    fontWeight: "bold",
    color: "#0d6efd",
  }
  const input= {
    margin: 20
  }
  const style = {
    maxWidth: 243,
    maxHeight: 160

  }
  const margen = {
    margin: 20
  }
  let archivos = Archivos()
  return (
    <div className="App" >
      <div className='Title' style={title} ><h1>Uploader</h1></div>
      <div className="Alerta">
      {error > 0 &&
        <Alert key={'danger'} variant={'danger'} onClose={()=>setError(false)} dismissible style={input}>
        No has seleccionado ningún archivo!!
        </Alert>
      }
      {finish > 0 &&
        <Alert key={'primary'} variant={'primary'} onClose={()=>setFinish(false)} dismissible style={input}>
        Subida finalizada con exito!!
        </Alert>
      }
      </div>
      <div>
      <Form.Group controlId="formFileMultiple" className="mb-3" style={input}>
        <Form.Control type="file" onChange={onChange} multiple />
        <div className="d-grid gap-2" style={{marginTop: 20}}>
          <Button variant="primary" size="lg" onClick={onClick}>
            Enviar
          </Button>
        </div>
      </Form.Group>
      </div>
      <div style={input}>
      <ProgressBar animated now={progress} label={`${progress}%`} />
      </div>
      <Cards archivos={archivos}/> 
    </div>
  );
}

export default App;
