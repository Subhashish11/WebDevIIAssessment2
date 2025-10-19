const express = require("express");
const router = express.Router();
const eventDB = require("../event_db");

// upcoming events
router.get("/event/upcoming", (req, res) => {
  const query = `
    SELECT e.event_id, e.event_name, e.event_description, e.event_date, e.location,
           e.image_url, c.category_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.event_date >= CURDATE()
    ORDER BY e.event_date ASC
  `;

  eventDB.query(query, (err, results) => {
    if (err) return res.status(500).send("Database query error");
    res.json(results || []);
  });
});

// search events based on criteria
router.get("/event/search", (req, res) => {
  const { date, location, category } = req.query;
  let query = `
    SELECT e.event_id, e.event_name, e.event_description, e.event_date, e.location,
           e.image_url, c.category_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.event_date >= CURDATE()
  `;
  const params = [];

  if (date) { query += " AND e.event_date = ?"; params.push(date); }
  if (location) { query += " AND e.location LIKE ?"; params.push(`%${location}%`); }
  if (category) { query += " AND e.category_id = ?"; params.push(category); }

  query += " ORDER BY e.event_date ASC";

  eventDB.query(query, params, (err, results) => {
    if (err) return res.status(500).send("Database query error");
    res.json(results || []);
  });
});

// GET event details by event id
router.get("/event/:id", (req, res) => {
  const query = `
    SELECT e.*, c.category_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.event_id = ?
  `;
  eventDB.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).send("Database query error");
    if (!results.length) return res.status(404).send("Event not found");
    res.json(results[0]);
  });
});

// all categories
router.get("/categories", (req, res) => {
  eventDB.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).send("Database query error");
    res.json(results);
  });
});

module.exports = router;
