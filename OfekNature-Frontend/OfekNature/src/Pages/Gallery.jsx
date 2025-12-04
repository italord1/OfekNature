import { useEffect, useState } from "react";
import "../Styles/Gallery.css";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/photos")   
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
        setLoading(false);
        console.log(data)
      })
      .catch(err => {
        console.error("Failed to load photos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>טוען תמונות...</p>;

  return (
    <div className="page">
      <h1>גלריית טבע</h1>
      <p>צילומים מרהיבים מהסדנאות, הטיולים וההדרכות של אופק</p>

      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <div className="gallery-item" key={i}>
            <img src={photo.url} alt={photo.name} />

            {(photo.description || photo.credit) && (
              <div className="photo-info">
                {photo.description && <p className="description">{photo.description}</p>}
                {photo.credit && <p className="credit">קרדיט: {photo.credit}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
