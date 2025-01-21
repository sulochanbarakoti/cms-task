const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

const db = new sqlite3.Database("./db/database.sqlite");

//Fetch paginated content
router.get("/content", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  db.get(`SELECT COUNT(*) as total FROM content`, (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const totalRecords = result.total;
    const totalPages = Math.ceil(totalRecords / limit);
    db.all(
      `SELECT * FROM content LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ data: rows, page: parseInt(page), totalPages });
        }
      }
    );
  });
});

// Search content
// router.get("/search", (req, res) => {
//   const { query } = req.query;
//   console.log(res.query);
//   db.all(
//     `SELECT * FROM content WHERE sentence_first_lang LIKE ? OR sentence_second_lang LIKE ?`,
//     [`%${query}%`, `%${query}%`],
//     (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       } else {
//         res.json(rows);
//       }
//     }
//   );
// });

router.get("/search", (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  console.log(req.query);

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const offset = (page - 1) * limit;

  db.all(
    `SELECT * FROM content WHERE sentence_first_lang LIKE ? OR sentence_second_lang LIKE ?`,
    [`%${query}%`, `%${query}%`],
    (err, rows) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const paginatedRows = rows.slice(offset, offset + parseInt(limit));
        res.json({
          data: paginatedRows,
          totalRecords: rows.length,
          totalPages: Math.ceil(rows.length / limit),
          page: parseInt(page),
        });
      }
    }
  );
});

// Update content
router.put("/content/:id", (req, res) => {
  const { id } = req.params;
  const { word_first_lang, sentence_first_lang, example } = req.body;

  db.run(
    `UPDATE content SET word_first_lang = ?, sentence_first_lang = ?, example = ? WHERE id = ?`,
    [word_first_lang, sentence_first_lang, example, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          message: "Content updated successfully",
          changes: this.changes,
        });
      }
    }
  );
});

module.exports = router;
