import { useContext, useEffect, useState } from "react"
import { TheUserContext } from "./userContex"
import API_URL from "../config/api"

export default function Diet() {
    const contexData = useContext(TheUserContext)
    const [dietData, setDietData] = useState([])
    const [message, setMessage] = useState("");
    console.log("Diet picture path",contexData.userData.picture)
    // AI
    const nutritionTotal = dietData.reduce(
        (total, item) => {
            total.calories += Number(item.details?.calories || 0);
            total.carbohydrate += Number(item.details?.carbohydrate || 0);
            total.fat += Number(item.details?.fat || 0);
            total.fiber += Number(item.details?.fiber || 0);
            total.protein += Number(item.details?.protein || 0);

            return total;
        },
        {
            calories: 0,
            carbohydrate: 0,
            fat: 0,
            fiber: 0,
            protein: 0,
        }
    );



    function handleDiet(e) {

        if (e.target.value.length !== 0) {
            fetch(`${API_URL}/track/${contexData.userData.id}/${e.target.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${contexData.userData.token}`
                }
            })
                .then((res) => res.json()
                )
                .then((resData) => {
                    setDietData(resData)

                    setMessage(resData.message)
                    setTimeout(() => {
                        setMessage("")

                    }, 3000);
                })

                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            setDietData([])

        }

    }

    // Calculate Total Diet



    return (
        <div className="diet-container">



            <div className="product-nutrition">


                <div className="section-heading">

                    <h3 className="diet-title"><span>FOOD eaten by  </span> {contexData.userData.userName}<img src={`${contexData.userData.picture}`} alt="Profile-Pic" className="profile-img" /> </h3>
                    <h4>Select Eaten Date <span><input type="date" onChange={handleDiet} /></span> </h4>
                   
                    {
                        dietData.length !== 0 ?
                            <><h4>
                                Compare different food products based on
                                quantity, nutrition, and price. <span><p>Eaten Date : {dietData[0].eatenDate}</p></span>
                            </h4>
                                </> : null
                    }




                </div>
                {/* AI */}
                {
                    dietData.length !== 0 ? (
                        <div className="diet-item">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Calories</th>
                                        <th>Carbohydrate</th>
                                        <th>Fat</th>
                                        <th>Fiber</th>
                                        <th>Protein</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dietData.map((dItem) => (
                                        <tr key={dItem._id}>
                                            <td>{dItem.productId.name}</td>
                                            <td>{dItem.quantity} g</td>
                                            <td>{dItem.details?.calories || 0} Kcal</td>
                                            <td>{dItem.details?.carbohydrate || 0} g</td>
                                            <td>{dItem.details?.fat || 0} g</td>
                                            <td>{dItem.details?.fiber || 0} g</td>
                                            <td>{dItem.details?.protein || 0} g</td>
                                            <td>{dItem.price}</td>
                                        </tr>
                                    ))}

                                    {/* TOTAL */}
                                    <tr>
                                        <td><strong>Total</strong></td>
                                        <td>
                                            <strong>
                                                {dietData.reduce(
                                                    (sum, item) =>
                                                        sum + Number(item.quantity || 0),
                                                    0
                                                )}{" "}
                                                g
                                            </strong>
                                        </td>

                                        <td>
                                            <strong>
                                                {nutritionTotal.calories.toFixed(2)} Kcal
                                            </strong>
                                        </td>

                                        <td>
                                            <strong>
                                                {nutritionTotal.carbohydrate.toFixed(2)} g
                                            </strong>
                                        </td>

                                        <td>
                                            <strong>
                                                {nutritionTotal.fat.toFixed(2)} g
                                            </strong>
                                        </td>

                                        <td>
                                            <strong>
                                                {nutritionTotal.fiber.toFixed(2)} g
                                            </strong>
                                        </td>

                                        <td>
                                            <strong>
                                                {nutritionTotal.protein.toFixed(2)} g
                                            </strong>
                                        </td>
                                        <td>
                                            <strong>
                                                Rs.
                                                {dietData.reduce(
                                                    (sum, item) =>
                                                        sum + Number(item.price || 0),
                                                    0
                                                )}{" "}

                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : null
                }


            </div>
            {message && (
                <p className={message.includes("successful") ? "success" : "error"}>
                    {message}
                </p>
            )}
        </div>
    )
}