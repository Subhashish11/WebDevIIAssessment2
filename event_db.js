// event_db.js
const mysql = require('mysql2');
const dbDetails = require('./db_details.js'); // import the DB credentials

// Create a connection to MySQL using details from db_details.js
const connection = mysql.createConnection({
  host: dbDetails.host,
  user: dbDetails.user,
  password: dbDetails.password,
  database: dbDetails.database
});

// Exception handling
connection.connect((err) => {
  if (err) {
    console.error('Failed to establish connection:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Export the connection for use in other files
module.exports = connection;
