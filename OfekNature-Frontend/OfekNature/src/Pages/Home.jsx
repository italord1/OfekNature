import "../Styles/Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { BaseUrlContext } from "../Context/BaseUrl";

export default function Home() {
  const [bg, setBg] = useState("");
  const baseUrl = useContext(BaseUrlContext);

  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await fetch(`${baseUrl}/photos`);
        const data = await res.json();

        if (data.photos?.length > 0) {
          const random = data.photos[Math.floor(Math.random() * data.photos.length)];
          setBg(random.url);
        }
      } catch (err) {
        console.error("Home background error:", err);
        setBg("https://images.unsplash.com/photo-1506744038136-46273834b3fb");
      }
    };

    getImage();
  }, [baseUrl]);

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="home-overlay"></div>

      <div className="hero-content">
        <h1>Nature With Ofek</h1>
        <p>הדרכות טבע, טיולים וסדנאות חווייתיות</p>
        <Link to="/gallery" className="btn">Explore Gallery</Link>
      </div>
    </div>
  );
}
