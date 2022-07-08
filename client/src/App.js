import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Navigation from './components/Navigation'
import Uploader from './components/Uploader'

function App() {
  return (
    <BrowserRouter id="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Uploader />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
