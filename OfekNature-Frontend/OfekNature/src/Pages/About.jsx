import { useState, useEffect, useContext } from "react";
import "../Styles/About.css";
import { BaseUrlContext } from "../Context/BaseUrl";

function About() {
  const [background, setBackground] = useState("");
  const baseUrl = useContext(BaseUrlContext);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const res = await fetch(`${baseUrl}/photos`);
        const data = await res.json();

        console.log(data); 

        if (Array.isArray(data) && data.length > 0) {
          const randomPhoto =
            data[Math.floor(Math.random() * data.length)];

          console.log("Selected:", randomPhoto.url);

          setBackground(randomPhoto.url);
        }
      } catch (err) {
        console.error("Error fetching background photo:", err);
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
          אופק מזמין אתכם לחוות את הטבע בצורה שונה ומיוחדת. בין אם מדובר בטיולים מרגיעים בשבילי יער,
          מסעות בעקבות נופים מרהיבים או מפגש עם בעלי חיים בסביבתם הטבעית – החוויה עם אופק היא חיבור
          אמיתי לטבע, להרפתקה ולהשראה.
        </p>
      </div>
    </section>
  );
}

export default About;
