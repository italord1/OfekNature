import "../Styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Nature With Ofek</h1>
          <p>הדרכות טבע, טיולים וסדנאות חווייתיות</p>
          <Link to="/gallery" className="btn">Explore Gallery</Link>
        </div>
      </section>
    </div>
  );
}
