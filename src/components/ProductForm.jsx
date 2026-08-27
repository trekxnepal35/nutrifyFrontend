
import { useContext, useState } from "react"
import { TheUserContext } from "./userContex"
import API_URL from "../config/api";


export default function ProductForm() {
    const contexData = useContext(TheUserContext)

    const [formData, setFormData] = useState({
        name: "",
        carbohydrate: "",
        calories: "",
        protein: "",
        fiber: "",
        fat: "",
        picture: null
    });

    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(null);


    // Handle text and number inputs
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // Handle picture
    const handlePicture = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setFormData({
            ...formData,
            picture: file
        });

        // Create picture preview
        setPreview(
            URL.createObjectURL(file)
        );
    };


    // Submit form
    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");


        // Create FormData
        const data = new FormData();

        data.append("name", formData.name);
        data.append("carbohydrate", formData.carbohydrate);
        data.append("calories", formData.calories);
        data.append("protein", formData.protein);
        data.append("fiber", formData.fiber);
        data.append("fat", formData.fat);
        data.append("picture", formData.picture);


        try {

            const response = await fetch(`${API_URL}/api/products`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${contexData.userData.token}`
                },
                body: data
            });


            const result = await response.json();
            console.log("Result", result)
                , result

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to save product"
                );
            }


            console.log(
                "Saved product:",
                result.product
            );


            setMessage(
                "Product saved successfully!"
            );


            // Clear form
            setFormData({
                name: "",
                carbohydrate: "",
                calories: "",
                protein: "",
                fiber: "",
                fat: "",
                picture: null
            });


            setPreview(null);


            // Clear file input
            document.getElementById(
                "picture"
            ).value = "";


        } catch (error) {

            console.log(error);

            setMessage(
                error.message
            );
        }
    };


    return (
        <div className="product-form-container">

            <h2 className="product-form-title">
                Add Product
            </h2>

            <form className="product-form" onSubmit={handleSubmit}>

                {/* Product Name */}
                <div className="form-group">
                    <label htmlFor="name">
                        Product Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Apple"
                        required
                    />
                </div>

                {/* Carbohydrate */}
                <div className="form-group">
                    <label htmlFor="carbohydrate">
                        Carbohydrate (g)
                    </label>

                    <input
                        id="carbohydrate"
                        type="number"
                        step="0.01"
                        name="carbohydrate"
                        value={formData.carbohydrate}
                        onChange={handleChange}
                        placeholder="13.81"
                        required
                    />
                </div>

                {/* Calories */}
                <div className="form-group">
                    <label htmlFor="calories">
                        Calories (kcal)
                    </label>

                    <input
                        id="calories"
                        type="number"
                        step="0.01"
                        name="calories"
                        value={formData.calories}
                        onChange={handleChange}
                        placeholder="52"
                        required
                    />
                </div>

                {/* Protein */}
                <div className="form-group">
                    <label htmlFor="protein">
                        Protein (g)
                    </label>

                    <input
                        id="protein"
                        type="number"
                        step="0.01"
                        name="protein"
                        value={formData.protein}
                        onChange={handleChange}
                        placeholder="0.26"
                        required
                    />
                </div>

                {/* Fiber */}
                <div className="form-group">
                    <label htmlFor="fiber">
                        Fiber (g)
                    </label>

                    <input
                        id="fiber"
                        type="number"
                        step="0.01"
                        name="fiber"
                        value={formData.fiber}
                        onChange={handleChange}
                        placeholder="2.4"
                        required
                    />
                </div>

                {/* Fat */}
                <div className="form-group">
                    <label htmlFor="fat">
                        Fat (g)
                    </label>

                    <input
                        id="fat"
                        type="number"
                        step="0.01"
                        name="fat"
                        value={formData.fat}
                        onChange={handleChange}
                        placeholder="0.17"
                        required
                    />
                </div>

                {/* Product Picture */}
                <div className="form-group">
                    <label htmlFor="picture">
                        Product Picture
                    </label>

                    <input
                        id="picture"
                        name="picture"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePicture}
                        required
                    />
                </div>

                {/* Picture Preview */}
                {preview && (
                    <div className="preview-container">
                        <p className="preview-title">
                            Preview
                        </p>

                        <img
                            className="product-preview"
                            src={preview}
                            alt="Product preview"
                            width="160"
                            height="160"
                        />
                    </div>
                )}

                {/* Message */}
                {message && (
                    <p className="form-message">
                        {message}
                    </p>
                )}

                {/* Submit Button */}
                <button
                    className="save-product-button"
                    type="submit"
                >
                    Save Product
                </button>

            </form>

        </div>
      
    );
}