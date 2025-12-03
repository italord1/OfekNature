import "../Styles/Gallery.css";

export default function Gallery() {
  return (
    <div className="page">
      <h1>גלריית טבע</h1>
      <p>צילומים מרהיבים מהסדנאות, הטיולים וההדרכות של OfeK Nature.</p>

      <div className="gallery-grid">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" alt="" />
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" alt="" />
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" alt="" />
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" alt="" />
      </div>
    </div>
  );
}