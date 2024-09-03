"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
/* ------------------------------------------------------- */
// Required Modules:
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
// Statik dosyalar için:
app.use(express.static(path.join(__dirname, "public")));
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
// API Routes:
app.use("/api", require("./src/routes/api"));

// View Routes:
app.use("/", require("./src/routes/view"));

// HomePath for API:
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

/* ------------------------------------------------------- */
// errorHandler:
app.use(require("./src/middlewares/errorHandler"));
// RUN SERVER:
app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);
