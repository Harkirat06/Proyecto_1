import axios from 'axios'
import {Titulo} from './Axios'
import { useState } from 'react'
import {ProgressBar,Button,Form,Alert} from 'react-bootstrap'

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
      setTimeout(()=>setProgress(0), 5000)
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
    margin: 20
  }
  const input= {
    margin: 20
  }
  const [mensaje, archivos] = Titulo()

  return (
    <div className="Upload" >
      <div className='Title' style={title} >
      <h1>{mensaje}</h1>
      </div>
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
      <Form.Group controlId="formFileMultiple" className="mb-3" style={input}>
        <Form.Control type="file" onChange={onChange} multiple />
        <div className="d-grid gap-2" style={{marginTop: 20}}>
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
