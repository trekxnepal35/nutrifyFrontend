import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import { TheUserContext } from './components/userContex'
import Track from './components/Track'
import Private from './components/Private'
import Header from './components/Header'
import Demo from './components/Demo'
import Logout from './components/Logout'
import Diet from './components/Diet'
import ProductForm from './components/ProductForm'
import Home from './components/Home'




function App() {
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("nutrify-user")))
  console.log("App Data",userData)
  return (
    <>    
   
    <TheUserContext.Provider value={{userData, setUserData}}>
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/track" element={<Private Component={Track}/>} />
      <Route path="/diet" element={<Private Component={Diet}/> }/>
      <Route path="/demo" element={<Private Component={Demo}/>} />
      <Route path="/productform" element={<Private Component={ProductForm}/>} />
      <Route path="/logout" element={<Logout/>} />
     
  
      
  
    </Routes>
    </BrowserRouter>
   
    </TheUserContext.Provider>
   
    </>
   
  )
}

export default App
