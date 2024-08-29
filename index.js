"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); // Import path module

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configurations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Set view engine to EJS
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.join(__dirname, "src/views")); // Set views directory

// Middlewares:

// Enable CORS
app.use(cors());

// Accept JSON:
app.use(express.json());

// Call static uploadFile:
app.use("/upload", express.static("./src/upload"));

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes:

// Use Routes from routes/index.js
app.use(require("./src/routes"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);

/* ------------------------------------------------------- */
// Synchronization (must be in commentLine):
//require("./src/helpers/sync")(); // !!! It clear database.
