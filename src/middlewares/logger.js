"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const morgan = require("morgan");
const fs = require("node:fs");
const path = require("path");

// Log klasörünü oluştur
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const now = new Date();
const today = now.toISOString().split("T")[0];

// Morgan için stream ayarları
const accessLogStream = fs.createWriteStream(
  path.join(logDir, `${today}.log`),
  { flags: "a+" }
);

module.exports = morgan("combined", {
  stream: accessLogStream,
});
