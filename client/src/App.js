import axios from 'axios';
import { useState } from 'react';


function App() {
  const [mensaje,setMensaje] = useState("")
  const [doc,setDoc] = useState(null)
  const [name,setName] = useState("")
  
  const onClick = (e) => {
    const arr = Array.from(doc)
    console.log(arr)
    const data = new FormData()
    arr.map((file)=>{
    data.append("docs",file)
    })
    axios.post("/uploadFile", data).then((res) => console.log(res))
  }
  
  axios.get("/api").then(response => {
    const {data} = response
    setMensaje(data.message) 
  })

  return (
    <div className="Upload">
      <h1>{mensaje}</h1>
      <form>
      <div className="mb-3">
        <input className="form-control" type="file" id="formFileMultiple"  name='docs' onChange={(e) => { 
          setDoc(e.target.files)
          setName(e.target.value)}} multiple />
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onClick}>Submit</button> 
      </div>
      </form>
    </div>
  );
}

export default App;
