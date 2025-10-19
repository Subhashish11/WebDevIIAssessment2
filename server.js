require("dotenv").config();
//initialising express for flexibility in coding
const express = require("express");
//implementing CORS to prevent cross-origin erors from other domains

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// API router
const charityAPI = require("./controllerAPI/api-controller");
app.use("/api", charityAPI);

// Start server
const PORT = process.env.PORT||3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
