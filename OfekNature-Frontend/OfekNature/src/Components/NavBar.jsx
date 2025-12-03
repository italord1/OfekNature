import { Link } from "react-router-dom";
import { useState } from "react";
import "../Styles/NavBar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">Ofek Nature</h2>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={open ? "nav-links active" : "nav-links"}>
        <li><Link to="/contact" onClick={() => setOpen(false)}>צור קשר</Link></li>
         <li><Link to="/gallery" onClick={() => setOpen(false)}>גלריה</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>אודות</Link></li>
        <li><Link to="/" onClick={() => setOpen(false)}>בית</Link></li>
       
       
        
      </ul>
    </nav>
  );
}
