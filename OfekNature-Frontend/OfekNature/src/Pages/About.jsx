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

        if (Array.isArray(data) && data.length > 0) {
          const randomPhoto = data[Math.floor(Math.random() * data.length)];
          setBackground(randomPhoto.url);
        }
      } catch (err) {
        console.error("Error fetching background photo:", err);
        setBackground(
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        );
      }
    };

    fetchBackground();
  }, [baseUrl]);

  return (
    <section
      className="about"
      style={{
        backgroundImage: `url("${background}")`,
      }}
    >
      <div className="about-overlay"></div>
      <div className="about-content">
        <h2>על אופק והחוויה בטבע</h2>

        <p>
          אופק מזמין אתכם לחוות את הטבע בצורה שונה ומיוחדת. בין אם מדובר בטיולים מרגיעים,
          מסעות בנופים מרהיבים או מפגש עם בעלי חיים – החוויה היא חיבור אמיתי לטבע.
        </p>

        <div className="video-wrapper">
          <iframe
            src="https://drive.google.com/file/d/11pN5v78xCU7RfUND2oIcDtx4NZGvKpEFfI6G3Wtp0T4/preview"
           allow="autoplay; fullscreen"
           allowFullScreen
            title="promo-video"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default About;
