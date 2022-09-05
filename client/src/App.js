import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Navigation from './components/Navigation'
import Uploader from './components/Uploader'
import StateProvider from './components/StateProvider'
import { createContext, useEffect } from 'react'
import Cards from './components/Cards'
import Login from './components/Login'
import NotFound from './components/NotFound'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const StateContext = createContext()
  return (
    <BrowserRouter id="App">
      <StateProvider context={StateContext}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT}>
          <Routes>
            <Route exact path="/" element={<Login context={StateContext} />} />
            <Route path="/cloud" element={
              <div>
                <Navigation context={StateContext} />
                <Cards context={StateContext} />
              </div>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GoogleOAuthProvider>
      </StateProvider>
    </BrowserRouter>
  )
}

export default App;
