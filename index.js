"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const app = express();

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

// Accept JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS Template Engine
app.set("view engine", "ejs");
app.set("views", "./public");

// EJS Layouts
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layouts/main"); // varsayılan layout

// Session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Flash Messages
const flash = require("connect-flash");
app.use(flash());

// CSRF Protection
const csrf = require("csurf");
app.use(csrf());

// Method Override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// StaticFiles:
app.use("/assets", express.static("./public/assets"));
app.use("/tinymce", express.static("./node_modules/tinymce"));

// Call static uploadFile:
app.use("/upload", express.static("./upload"));

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.flash = req.flash();
  res.locals.user = req.user;
  res.locals.csrfToken = req.csrfToken();
  next();
});

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.render("index", {
    title: "Welcome to Blog App",
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routes"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
