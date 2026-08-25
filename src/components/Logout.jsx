

import { useContext } from "react"
import { TheUserContext } from "./userContex"
import { Navigate } from "react-router-dom"

export default function Logout(){

    const contexData = useContext(TheUserContext)
    console.log("Private Data",contexData)
    
        contexData.setUserData(null);
        localStorage.removeItem("nutrify-user")
       return <Navigate to ="/login"/>
    
    
    
}