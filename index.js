"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const app = express();
const cors = require("cors");

/* ------------------------------------------------------- */
// Required Modules:

// TemplateEngine:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Enable CORS
app.use(cors());

// Accept JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set View Engine:
app.set("view engine", "ejs");
// Default template folder: ./views
app.set("views", "./src/views");

// Call static uploadFile:
app.use("/upload", express.static("src/upload"));

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/api", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Blog Management API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

app.all("/", (req, res) => {
  res.render("index");
});

// Use Routes from routes/index.js
app.use(require("./src/routes/api"));

// Use Routes from routes/views/index.js
app.use(require("./src/routes/views"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
