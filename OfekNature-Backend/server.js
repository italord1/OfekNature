require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { parse } = require("csv-parse/sync");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const SHEET_ID = process.env.SHEET_ID;
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

app.get("/photos", async (req, res) => {
  try {
    const response = await axios.get(CSV_URL);

    const records = parse(response.data, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    const photos = records.map(row => {
      const id = row.id?.trim() || "";

      return {
        name: row.name || "",
        id,
        url: id ? `https://lh3.googleusercontent.com/d/${id}` : "",
        description: row.description || "",
        credit: row.credit || ""
      };
    });

    res.json(photos);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load photos" });
  }
});



app.post('/send-email', async (req, res) => {
  const { fname, lname, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${fname} ${lname}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
