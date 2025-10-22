const express=require("express");
const router=express.Router();
const db=require("../event_db");

//List all events
router.get("/event",(req,res)=>{
const query="SELECT * FROM events ORDER BY event_date ASC";
db.query(query,(err,results)=>{
if(err) return res.status(500).json({error:"Database error"});
res.json(results);
});
});

// Create a new event
 router.post("/event", (req, res) => {
   const { event_name, event_description, event_date, location, category_id, image_url } = req.body;
   if (!event_name || !event_date || !location || !category_id) {
     return res.status(400).json({ error: "Missing required fields" });
   }

   const sql = `INSERT INTO events (event_name, event_description, event_date, location, category_id, image_url)
                VALUES (?, ?, ?, ?, ?, ?)`;
   db.query(sql, [event_name, event_description, event_date, location, category_id, image_url], (err, result) => {
     if (err) return res.status(500).json({ error: "Database error" });
     res.status(201).json({ message: "Event created!", event_id: result.insertId });
   });
 });

 // Update event
 router.put("/event/:id", (req, res) => {
   const { event_name, event_description, event_date, location, category_id, image_url } = req.body;
   const sql = `UPDATE events SET event_name=?, event_description=?, event_date=?, location=?, category_id=?, image_url=? WHERE event_id=?`;
   db.query(sql, [event_name, event_description, event_date, location, category_id, image_url, req.params.id], (err, result) => {
     if (err) return res.status(500).json({ error: "Database error" });
     res.json({ message: "Event updated!" });
   });
 });

 // Delete event
 router.delete("/event/:id", (req, res) => {
   const checkSql = "SELECT COUNT(*) AS count FROM registrations WHERE event_id=?";
   db.query(checkSql, [req.params.id], (err, results) => {
     if (err) return res.status(500).json({ error: "Database error" });
     if (results[0].count > 0) return res.status(400).json({ error: "Cannot delete event with registrations" });

     const deleteSql = "DELETE FROM events WHERE event_id=?";
     db.query(deleteSql, [req.params.id], (err, result) => {
       if (err) return res.status(500).json({ error: "Database error" });
       res.json({ message: "Event deleted!" });
     });
   });
 });

 module.exports = router;