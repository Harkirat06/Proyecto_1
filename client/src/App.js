import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Navigation from './components/Navigation'
import Uploader from './components/Uploader'
import StateProvider from './components/StateProvider'
import { createContext } from 'react'
import Cards from './components/Cards'
import Login from './components/Login'

function NotFound() {
  return <>Ha llegado a una página que no existe</>;
}
function App() {
  const StateContext = createContext()
  return (
    <BrowserRouter id="App">
      <StateProvider context={StateContext}>
        <Routes>
          <Route exact path="/" element={<Login context={StateContext}/>} />
          <Route path="/cloud" element={
            <div>
              <Navigation />
              <Uploader context={StateContext} />
              <Cards context={StateContext} />
            </div>
          } />
          <Route path="*" component={NotFound}/>
        </Routes>
      </StateProvider>
    </BrowserRouter>
  )
}

export default App;
