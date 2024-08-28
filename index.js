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
// Configurations:

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
app.set("layout", "public/index"); // Default layout

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

// Import data fetching functions from postService.js
const {
  getRecentPosts,
  getPosts,
  getAuthors,
  getCategories,
  getPostCount, // Toplam post sayısını almak için
} = require("./src/services/postService");

// HomePath:
app.all("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Şu anki sayfa numarasını al (varsayılan: 1)
    const limit = 10; // Her sayfada gösterilecek yazı sayısı
    const offset = (page - 1) * limit;

    const recentPosts = await getRecentPosts(); // Son yazıları getir
    const posts = await getPosts({ limit, offset }); // Sayfalandırılmış yazıları getir
    const authors = await getAuthors(); // Yazarları getir
    const categories = await getCategories(); // Kategorileri getir
    const totalPosts = await getPostCount(); // Toplam yazı sayısını al

    const totalPages = Math.ceil(totalPosts / limit); // Toplam sayfa sayısını hesapla

    res.render("index", {
      title: "My Tech Blog - Home",
      user: req.user,
      recentPosts: recentPosts,
      posts: posts,
      authors: authors,
      categories: categories,
      page: page, // Şu anki sayfa numarası
      totalPages: totalPages, // Toplam sayfa sayısı
      baseUrl: "/", // Sayfalandırma için temel URL
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Additional routes
app.use(require("./src/routes"));

/* ------------------------------------------------------- */

// Error handling middleware
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);

/* ------------------------------------------------------- */
// Synchronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clears database.
