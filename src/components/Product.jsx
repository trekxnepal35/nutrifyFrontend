import { useContext, useState } from "react"
import { TheUserContext } from "./userContex"
import API_URL from "../config/api";

export default function Product(props){
    const contexData = useContext(TheUserContext)
    const [message, setMessage] = useState("");
  

    const {singleProduct}= props
    let values = {...singleProduct}
    const[qty, setQty]=useState(100)
    const [price,setPrice] = useState({price:""})  

    const increse =()=>{
        setQty((prev)=>prev + 10)
  
    }
    const decrese =()=>{
        setQty((prev)=>Math.max(10, prev - 10));
        console.log("qty",qty)
    }

    // Set Price
    function handlePrice(e){
     setPrice(prev=>({
      ...prev,price:e.target.value
     }))}

    

    const multiplier = qty / 100;

     values = {
      calories: Math.round(singleProduct.calories * multiplier),
      carbohydrate: (singleProduct.carbohydrate * multiplier).toFixed(2),
      fat: (singleProduct.fat * multiplier).toFixed(2),
      fiber: (singleProduct.fiber * multiplier).toFixed(2),
      protein: (singleProduct.protein * multiplier).toFixed(2),
    };


const trackitem = ()=>{
   let trackData=
        {
        userId:contexData.userData.id,
            productId:props.singleProduct._id,
            details:{
                calories:values.calories,
                carbohydrate:values.carbohydrate,
                fat:values.fat,
                fiber:values.fiber,
                protein:values.protein,
            
            },
            eatenDate:new Date().toISOString().split("T")[0],
            quantity:qty,
            price:price.price
        }
        if(trackData.price===""){
          return setMessage("Enter Price")
        }
            
    console.log("In price",trackData.price)

    
  
    console.log("trackItem in",trackData,values)
    

    fetch(`${API_URL}/track`, {
      method: "POST",
      body:JSON.stringify(trackData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${contexData.userData.token}`
      }
    })
      .then((res) => res.json()
      )
      .then((resData) => {        
        console.log(resData)       
        setMessage(resData.message)
        setPrice({price:""})
        setTimeout(() => {
          setMessage("")

        }, 3000);
      })
      .catch((err)=>{
        console.log(err)
      })
}

    return(
       
        <div className="product-container">
            {/* Image Section */}
            
            <div className="product-image">
            {singleProduct?.picture?<img className="product-img" src={`${singleProduct.picture}`} alt="Product Image" />:null }
                
                <div className="product-qty">
                    <button className="qty-btn" onClick={increse}>+</button>
                    <span className="qty-data">{qty}g</span>
                    <button className="qty-btn" onClick={decrese}>-</button>
                </div>
                <div className="price">
                  <input type="number" placeholder="Enter a Price" name="price" className="price-input" value={price.price} onChange={handlePrice} />
                </div>
                <div className="track-item">
                    <button className="track-btn" onClick={trackitem}>Track</button>
                </div>
                {message && (
        <p className={message.includes("successful") ? "success" : "error"}>
          {message}
        </p>
      )}
            </div>

            <div className="product-nutrition">
            <h3>{singleProduct.name}</h3>
            <p className="nutrition-fact">Nutrition Facts per <span className="qty-title">{qty}g</span> </p>
             
        <div className="mt-4 divide-y divide-gray-100">

<NutritionRow
  icon="🔥"
  label="Calories"
  value={`${values.calories} kcal`}
/>

<NutritionRow
  icon="🌿"
  label="Carbohydrate"
  value={`${values.carbohydrate} g`}
/>

<NutritionRow
  icon="💧"
  label="Fat"
  value={`${values.fat} g`}
/>

<NutritionRow
  icon="🍃"
  label="Fiber"
  value={`${values.fiber} g`}
/>

<NutritionRow
  icon="💪"
  label="Protein"
  value={`${values.protein} g`}
/>

</div>
            </div>

         
            
        </div>
       
   
    )
}

function NutritionRow({ icon, label, value }) {
  return (
    <div className="fact-detail flex items-center justify-between py-3">

      <div className="fact-icon flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
          {icon}
        </span>

        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </div>

      <span className="text-sm font-bold text-gray-900">
        {value}
      </span>

    </div>
  );
}
