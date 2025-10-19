const express = require("express");
const router = express.Router();
const eventDB = require("../event_db");

//  Display upcoming events
router.get("/event/upcoming", (req, res) => {
  const query = `
    SELECT e.event_id, e.event_name, e.event_description, e.event_date, e.location, e.image_url, c.category_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.event_date >= CURDATE()
    ORDER BY e.event_date ASC
  `;

  eventDB.query(query, (err, results) => {
    if (err) {
      console.error("SQL Error:", err.message);
      return res.status(500).send("Database query error");
    }
    res.json(results || []);
  });
});

// SEARCH events by data, location and category criteria
router.get("/event/search", (req, res) => {
  const { date, location, category } = req.query;
  let query = `
    SELECT e.event_id, e.event_name, e.event_description, e.event_date, e.location, e.image_url, c.category_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.event_date >= CURDATE()
  `;
  const params = [];

  if (date) {
    query += " AND e.event_date = ?";
    params.push(date);
  }
  if (location) {
    query += " AND e.location LIKE ?";
    params.push(`%${location}%`);
  }
  if (category) {
    query += " AND e.category_id = ?";
    params.push(category);
  }

  query += " ORDER BY e.event_date ASC";

  eventDB.query(query, params, (err, results) => {
    if (err) {
      console.error("SQL Error:", err.message);
      return res.status(500).send("Database query error");
    }
    res.json(results || []);
  });
});

// GET details by Primary key which is event_id
router.get("/event/:id", (req, res) => {
  const eventId = req.params.id;

  const query = `
    SELECT e.event_id, e.event_name, e.event_description, e.event_date, e.location, e.image_url, c.category_name
    FROM events e
    JOIN categories c ON e.category_id = c.category_id
    WHERE e.event_id = ?
  `;

  eventDB.query(query, [eventId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err.message);
      return res.status(500).send("Database query error");
    }

    if (results.length === 0) {
      return res.status(404).send("Event not found");
    }

    res.json(results[0]);
  });
});

//GET all categories dynamically
router.get("/categories", (req, res) => {
    const query = "SELECT category_id, category_name FROM categories";
    eventDB.query(query, (err, results) => {
        if (err) {
            console.error("SQL Error:", err.message);
            return res.status(500).send("Database query error");
        }
        res.json(results);
    });
});

module.exports = router;
