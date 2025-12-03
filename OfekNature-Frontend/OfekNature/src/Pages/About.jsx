import { useState, useEffect, useContext } from "react";
import "../Styles/About.css";
import { BaseUrlContext } from "../Context/BaseUrl";

function About() {
  const [background, setBackground] = useState("");
  const baseUrl = useContext(BaseUrlContext);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/photos`);
        const data = await res.json();

        if (data && Array.isArray(data.photos) && data.photos.length > 0) {
          // נבחרת תמונה אקראית או לפי קטגוריה "nature"
          const naturePhotos = data.photos.filter(photo => photo.category === "nature");
          const selectedPhoto = naturePhotos.length > 0 ? 
            naturePhotos[Math.floor(Math.random() * naturePhotos.length)] : 
            data.photos[0];

          setBackground(selectedPhoto.url);
        }
      } catch (err) {
        console.error("Error fetching background photo:", err);
        // רקע ברירת מחדל אם יש תקלה
        setBackground("https://images.unsplash.com/photo-1506744038136-46273834b3fb");
      }
    };

    fetchBackground();
  }, [baseUrl]);

  return (
    <section
      className="about"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="about-overlay"></div>
      <div className="about-content">
        <h2>על אופק והחוויה בטבע</h2>
        <p>
           אופק מזמין אתכם לחוות את הטבע בצורה שונה ומיוחדת. בין אם מדובר בטיולים מרגיעים בשבילי יער, מסעות בעקבות נופים מרהיבים או מפגש עם בעלי חיים בסביבתם הטבעית – החוויה עם אופק היא חיבור אמיתי לטבע, להרפתקה ולהשראה.
        </p>
      </div>
    </section>
  );
}

export default About;
