import './App.css';
import axios from 'axios';
import { useState } from 'react';


function App() {
  const [mensaje,setMensaje] = useState("")
  axios.get("/api").then(response => {
    const {data} = response
    setMensaje(data.message) 
  })
  return (
    <div className="Upload">
      <h1>{mensaje}</h1>
      <div class="mb-3">
        <label for="formFileMultiple" class="form-label">Multiple files input example</label>
        <input class="form-control" type="file" id="formFileMultiple" multiple />
      </div>
    </div>
  );
}

export default App;
