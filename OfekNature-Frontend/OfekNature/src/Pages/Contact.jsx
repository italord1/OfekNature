import "../Styles/Contact.css";
import { useState,useContext } from "react";
import { BaseUrlContext } from "../Context/BaseUrl";

function Contact() {

   const baseUrl = useContext(BaseUrlContext);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${baseUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ fname: "", lname: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("❌ Error sending message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error. Please try again.");
    }
  };

  return (
    <section className="contact">
      <h2>צור קשר</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fname"
          type="text"
          placeholder="שם פרטי"
          value={formData.fname}
          onChange={handleChange}
          required
        />
        <input
          name="lname"
          type="text"
          placeholder="שם משפחה"
          value={formData.lname}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="מספר פלאפון"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          name="subject"
          type="text"
          placeholder="נושא"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="תוכן ההודעה"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">שלח</button>
      </form>

      {status && <p className="status-message">{status}</p>}

      <div className="contact-info">
        <p>📧 OfekNature@gmail.com</p>
        <p>📞 +972-053-335-5212</p>
        <a href="https://wa.me/9720533355212" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </section>
  );
}

export default Contact;
