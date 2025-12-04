require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { parse } = require("csv-parse/sync");

const app = express();
app.use(cors());

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

    const photos = records.map(row => ({
      name: row.name || "",
      id: row.id || "",
      url: row.directLink || "",
      description: row.description || "",
      credit: row.credit || ""
    }));

    res.json(photos);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load photos" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
