import {Router, Routes, Route, BrowserRouter} from 'react-router-dom'

import './App.css'
import { Login } from './pages/Login'
import { Films } from './pages/Films'

function App() {
 
  return (
    <BrowserRouter>
    <>
      <h1>Letterboxd Copycat</h1>

      <Routes>
        <Route path='/'       element={ <Login/> }/>
        <Route path='/films'  element={ <Films/> }/>
      </Routes>
      
    </>
    
    </BrowserRouter>
    
  )
}

export default App
