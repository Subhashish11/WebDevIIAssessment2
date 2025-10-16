const mysql = require("mysql2");
const dbDetails = require("./db_details");

// Create connection
const connection = mysql.createConnection({
  host: dbDetails.host,
  user: dbDetails.user,
  password: dbDetails.password,
  database: dbDetails.database
});

// Connect and test
connection.connect(err => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to MySQL database!");

    // ✅ Test query
    connection.query("SELECT 1 + 1 AS test", (err, results) => {
      if (err) console.error("DB connection test error:", err);
      else console.log("DB connection test:", results);
    });
  }
});

module.exports = connection;
