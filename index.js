"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const app = express();
const cors = require("cors");

// Ortam değişkenlerini yükle
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// async hatalarını yönetmek için
require("express-async-errors");

/* ------------------------------------------------------- */
// Veritabanı bağlantısı
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// View Engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* ------------------------------------------------------- */
// Global Middleware'ler

// CORS etkinleştir
app.use(cors());

// JSON isteği kabul et
app.use(express.json());

// Statik dosyaları servis et
app.use("/upload", express.static("./upload"));

// Logger çalıştır
app.use(require("./src/middlewares/logger"));

// Kimlik Doğrulama
app.use(require("./src/middlewares/authentication"));

// res.getModelList()
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Route Tanımlamaları

// Ana yol
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

// Anasayfa
app.all("/", (req, res) => {
  res.send("index");
});

// Diğer API route'ları
app.use("/api", require("./src/routes/api/index"));
app.use("/", require("./src/routes/views/index"));

/* ------------------------------------------------------- */
// Hata yönetimi middleware
app.use(require("./src/middlewares/errorHandler"));

// Sunucuyu çalıştır
app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);

/* ------------------------------------------------------- */
// Senkronizasyon (Yorum satırında bırakılmalı):
// require('./src/helpers/sync')() // !!! Veritabanını temizler.
