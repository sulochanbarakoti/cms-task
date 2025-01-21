const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

const url =
  "https://pecto-content-f2egcwgbcvbkbye6.z03.azurefd.net/language-data/language-data/russian-finnish/cards/curated_platform_cards/sm1_new_kap1.json";

const db = new sqlite3.Database("./db/database.sqlite");

async function loadData() {
  try {
    const response = await axios.get(url);
    console.log("Fetched data:", response.data);

    // Adjust to match the actual JSON structure
    const data = response.data || []; // Ensure 'cards' exists

    if (!Array.isArray(data)) {
      throw new Error("Invalid data structure: Expected an array of cards.");
    }

    db.serialize(() => {
      // Create the table if it doesn't exist
      db.run(`CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY,
        word_first_lang TEXT,
        sentence_first_lang TEXT,
        word_second_lang TEXT,
        sentence_second_lang TEXT,
      )`);

      // Prepare the insert statement
      const stmt = db.prepare(
        `INSERT OR REPLACE INTO content (id, word_first_lang, sentence_first_lang, word_second_lang, sentence_second_lang) VALUES (?, ?, ?, ?, ?)`
      );

      // Insert each card into the database
      data.forEach((card) => {
        stmt.run(
          card.id,
          card.wordFirstLang,
          card.sentenceFirstLang || null,
          card.wordSecondLang,
          card.sentenceSecondLang || null
        );
      });

      stmt.finalize();
    });

    console.log("Data loaded successfully!");
  } catch (error) {
    console.error("Error loading data:", error.message);
  } finally {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
}

loadData();
