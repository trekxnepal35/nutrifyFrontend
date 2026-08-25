"use client";

import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    age: "",
  });

  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  // -----------------------------
  // Handle text input
  // -----------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Handle picture
  // -----------------------------
  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Only allow images
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    // Maximum 2 MB
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Picture must be less than 2MB.");
      return;
    }

    setPicture(file);

    // Preview image
    setPreview(URL.createObjectURL(file));

    setMessage("");
  };

  // -----------------------------
  // Submit form
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check empty fields
    if (
      !formData.user ||
      !formData.email ||
      !formData.password ||
      !formData.age
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Check age
    if (Number(formData.age) < 13) {
      setMessage(
        "You must be at least 13 years old."
      );
      return;
    }

    // General email validation
    //
    // Allows:
    // gmail.com
    // yahoo.com
    // outlook.com
    // hotmail.com
    // icloud.com
    // proton.me
    // etc.
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setMessage(
        "Please enter a valid email address."
      );
      return;
    }

    // Picture required
    if (!picture) {
      setMessage(
        "Please select a profile picture."
      );
      return;
    }

    try {
      // -----------------------------
      // Create FormData
      // -----------------------------
      const data = new FormData();

      data.append("user", formData.user);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("age", formData.age);

      // Add picture
      data.append("picture", picture);

      // -----------------------------
      // Send to Express
      // -----------------------------
      const response = await fetch(
        "http://localhost:3001/register",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      // Show server message
      setMessage(result.message);

      // Registration successful
      if (result.success) {
        setFormData({
          user: "",
          email: "",
          password: "",
          age: "",
        });

        setPicture(null);
        setPreview("");
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to the server."
      );
    }
  };

  return (
    <div className="registration-page">

      <form
        className="registration-form"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <p className="subtitle">
          Register to get started
        </p>

        {/* ---------------- Name ---------------- */}
        <div className="form-group">

          <label htmlFor="user">
            Name
          </label>

          <input
            id="user"
            name="user"
            type="text"
            placeholder="Enter your name"
            value={formData.user}
            onChange={handleChange}
          />

        </div>


        {/* ---------------- Email ---------------- */}
        <div className="form-group">

          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <small>
            Gmail, Yahoo, Outlook, iCloud,
            Proton and other valid emails are
            accepted.
          </small>

        </div>


        {/* ---------------- Password ---------------- */}
        <div className="form-group">

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

        </div>


        {/* ---------------- Age ---------------- */}
        <div className="form-group">

          <label htmlFor="age">
            Age
          </label>

          <input
            id="age"
            name="age"
            type="number"
            min="13"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
          />

        </div>


        {/* ---------------- Picture ---------------- */}
        <div className="form-group">

          <label htmlFor="picture">
            Profile Picture
          </label>

          <input
            id="picture"
            name="picture"
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
          />

          <small>
            JPG, PNG, WEBP. Maximum 2MB.
          </small>

        </div>


        {/* ---------------- Preview ---------------- */}
        {preview && (
          <div className="picture-preview">

            <p>Picture Preview</p>

            <img
              src={preview}
              alt="Profile preview"
              width="150"
              height="150"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />

          </div>
        )}


        {/* ---------------- Register Button ---------------- */}
        <button type="submit">
          Register
        </button>


        {/* ---------------- Message ---------------- */}
        {message && (
          <p
            className={
              message
                .toLowerCase()
                .includes("successful")
                ? "success"
                : "error"
            }
          >
            {message}
          </p>
        )}

      </form>

    </div>
  );
}




// Old Code
// export default function Register(){
//     const [formData, setFormData] = useState({
//         user: "",
//         email: "",
//         password: "",
//         age: "",
//       });
    
//       const [message, setMessage] = useState("");
    
//       const handleChange = (e) => {
//         setFormData({
//           ...formData,
//           [e.target.name]: e.target.value,
//         });
//       };
    
//       const handleSubmit = (e) => {
//         e.preventDefault();        
//         if (
//           !formData.user ||
//           !formData.email ||
//           !formData.password ||
//           !formData.age
//         ) {
//           setMessage("Please fill in all fields.");
//           return;
//         }
    
//         if (Number(formData.age) < 13) {
//           setMessage("You must be at least 13 years old.");
//           return;
//         }

//         fetch("http://localhost:3001/register",{
//           method:"POST",
//           body:JSON.stringify(formData),
//           headers:{
//             "Content-Type":"application/json"
//           }})
//           .then((res)=>res.json())
//           .then((resData)=>setMessage(resData.message))         
//           .catch((err)=>{
//             console.log(err)
//           })};
    
//       return (
//         <div className="registration-page">
//           <form className="registration-form" onSubmit={handleSubmit}>
//             <h1>Create Account</h1>
//             <p className="subtitle">Register to get started</p>
    
//             <div className="form-group">
//               <label htmlFor="user">Name</label>
//               <input
//                 id="user"
//                 name="user"
//                 type="text"
//                 placeholder="Enter your name"
//                 value={formData.user}
//                 onChange={handleChange}
//               />
//             </div>
    
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
    
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
    
//             <div className="form-group">
//               <label htmlFor="age">Age</label>
//               <input
//                 id="age"
//                 name="age"
//                 type="number"
//                 min="13"
//                 placeholder="Enter your age"
//                 value={formData.age}
//                 onChange={handleChange}
//               />
//             </div>
    
//             <button type="submit">Register</button>
    
//             {message && (
//               <p className={message.includes("successful") ? "success" : "error"}>
//                 {message}
//               </p>
//             )}
//           </form>
//         </div>
//       );
    

    
// }