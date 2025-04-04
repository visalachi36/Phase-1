import { Link } from "react-router-dom";
import "../navbar.css"; // Import the CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">MyStore</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
