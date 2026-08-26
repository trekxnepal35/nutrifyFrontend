import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TheUserContext } from "./userContex";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
   const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const contexData = useContext(TheUserContext)

  console.log("Login Data",contexData)
  console.log("API URL",API_URL)
    

//  Function Handling Change data 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

// Function  Handling Fetch and  Submit Data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password
    ) {
      setMessage("Please fill in all fields.");
      setTimeout(()=>{
        setMessage("")

      },5000)

      return;
    }


    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json()
      )
      .then((resData) => {
        console.log("Login Data",resData.token)
        if(resData!==undefined)
        {
          localStorage.setItem("nutrify-user",JSON.stringify(resData))
          contexData.setUserData(resData)
          navigate("/track")

        }
        
        setMessage(resData.message)
        setTimeout(() => {
          setMessage("")
          
        }, 3000);       
      })

      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div className="registration-page">
      <form className="registration-form" onSubmit={handleSubmit}>
        <p className="subtitle">Login</p>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="login-btn">
          <button type="submit">Login</button>
          <p className="reg-btn">Don't have an account?  <Link to="/" className="reg-link">Register</Link> </p>
        </div>

        {message && (
          <p className={message.includes("successful") ? "success" : "error"}>
            {message}
          </p>
        )}
      </form>
    </div>
  );



}