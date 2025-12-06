import { useEffect, useState,useContext } from "react";
import "../Styles/Gallery.css";
import { BaseUrlContext } from "../Context/BaseUrl";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
   const baseUrl = useContext(BaseUrlContext);

  useEffect(() => {
    fetch(`${baseUrl}/photos`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
        setLoading(false);
        console.log(data);
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
        {photos.map((photo, i) => {
          const hasDescription =
            photo.description && photo.description.trim().length > 0;
          const hasCredit =
            photo.credit && photo.credit.trim().length > 0;

          return (
            <div className="gallery-item" key={i}>
              <img src={photo.url} alt={photo.name} />

              {(hasDescription || hasCredit) && (
                <div className="photo-info">
                  {hasDescription && (
                    <p className="description">{photo.description}</p>
                  )}

                  {hasCredit && (
                    <p className="credit">קרדיט: {photo.credit}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
