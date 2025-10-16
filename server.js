const express = require("express");
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
const PORT = 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
