const mysql = require("mysql2");
const dbDetails = require("./db_details");

// setting up connection to mySQL
const connection = mysql.createConnection({
  host: dbDetails.host,
  user: dbDetails.user,
  password: dbDetails.password,
  database: dbDetails.database
});

// Connecting and testing connection to sql
connection.connect(err => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to MySQL database!");
}
});
module.exports = connection;
