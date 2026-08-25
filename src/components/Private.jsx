import { useContext } from "react"
import { TheUserContext } from "./userContex"
import { Navigate } from "react-router-dom"

export default function Private(props){
    const contexData = useContext(TheUserContext)
    console.log("Private Data",contexData)
    return(
        contexData.userData!==null?    
        <props.Component/>
        :
        <Navigate to="/login"/>

       
    )
}