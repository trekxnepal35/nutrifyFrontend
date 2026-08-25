import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-page">
      


            {/* Introduction */}
            <section className="content-section">

                <div className="section-heading">
                    <span>ABOUT OUR PLATFORM</span>

                    <h2>
                        Nutrition + Price Calculation
                    </h2>

                    <p>
                        Our platform helps you understand both the
                        nutritional value and cost of the food you eat.
                    </p>
                    
                        <Link to="/login" className="cta-button">
                        Start Login
                        </Link>
                       
                  
                </div>


            </section>


        </div>
    );
}