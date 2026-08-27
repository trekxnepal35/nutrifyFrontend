import { useContext, useEffect, useState } from "react"
import { TheUserContext } from "./userContex";
import Product from "./Product";
import API_URL from "../config/api";

export default function Track() {
  const contexData = useContext(TheUserContext)

  const [message, setMessage] = useState("");
  const [productData, setProductData] = useState([])
  

  const [singleProduct, setSingleProduct] = useState(null)

 

  const searchProduct = (e) => {
    if(e.target.value.length!==0){
    fetch(`${API_URL}/product/${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${contexData.userData.token}`
      }
    })
      .then((res) => res.json()
      )
      .then((resData) => {        
        setProductData(resData)       
        setMessage(resData.message)
        setTimeout(() => {
          setMessage("")

        }, 3000);
      })

      .catch((err) => {
        console.log(err)
      })
    }
    else{
      setProductData([])
      setSingleProduct(null)
   
    }
  }


  return (
    <div className="track">
        <section className="track-hero" >
        <h2>
        Make Every Meal Count
    </h2>
    <h3 className="diet-title">{contexData.userData.userName}
    {contexData.userData?.picture ?<img src={`${contexData.userData.picture}`} alt="Profile-Pic" className="profile-img" />:null} </h3>
      <div className="search-product">
        <span>

        </span>
        <input type="search" placeholder="Search Foods/Fruit by Name" className="search-input" name="search" onChange={searchProduct} />
      </div>

</section>

      {
        productData.length!==0?
      
      <div className="product-list">
        {
          productData?.map((item)=>{
            console.log("item",item)
             return <p key={item._id} className="product-item" onClick={()=>
              {setSingleProduct(item)
              setProductData([])}}>{item.name}</p>

          })
        }      
          
      </div>:null}
        {
          singleProduct!==null?
          <Product singleProduct={singleProduct}/>:null

        }
      
      {message && (
        <p className={message.includes("successful") ? "success" : "error"}>
          {message}
        </p>
      )}
    </div>
  )
}