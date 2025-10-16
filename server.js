// Implementing express
const express = require('express');

// Implementing CORS
const cors = require('cors');

// Implementing body-parser
const bodyParser = require('body-parser');

// Creating an app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

// Defining a simple GET route
app.get('/', (req, res) => {
  res.sendFile(_dirname+"public/index.html");
});

//initialising controller api
const charityAPI=require("./controllerAPI/api-controller");

//implementing controller api
app.use("/api",charityAPI);

// Defining the port
const PORT = 3030;

// Starting the server
app.listen(PORT, () => {
  console.log(`Connection is live on port ${PORT}`);
});

