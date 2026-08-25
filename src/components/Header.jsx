import { Link, Navigate } from "react-router-dom";
import { TheUserContext } from "./userContex";
import { useContext,useState } from "react";


export default function Header() {
    const contexData = useContext(TheUserContext)
    console.log("Private Data", contexData)
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };
    return (
        <div className="header">

            <div className="navbar-container">

                {/* Logo / Brand */}
                {/* <div className="navbar-logo">
                    <Link to="/" onClick={closeMenu}>
                        NutriFy
                    </Link>
                </div> */}


                {/* Mobile Menu Button */}
                <button
                    className="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>


                {/* Navigation */}
                <ul className={`navbar ${menuOpen ? "navbar-open" : ""}`}>

                    <li>
                        <Link to="/" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/track" onClick={closeMenu}>
                            Track
                        </Link>
                    </li>

                    <li>
                        <Link to="/diet" onClick={closeMenu}>
                            Diet
                        </Link>
                    </li>

                    <li>
                        <Link to="/demo" onClick={closeMenu}>
                            Demo
                        </Link>
                    </li>

                    <li>
                        <Link to="/productform" onClick={closeMenu}>
                            Product Form
                        </Link>
                    </li>

                    <li>
                        <Link to="/login" onClick={closeMenu}>
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link to="/logout" onClick={closeMenu}>
                            Logout
                        </Link>
                    </li>

                    <li>
                        <Link to="/register" onClick={closeMenu}>
                            Register
                        </Link>
                    </li>

                </ul>

            </div>

        </div>
    )
}