"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const router = express.Router();
const path = require("path");

// routes/document:
// URL: /documents
router.all("/", (req, res) => {
  res.send({
    swagger: "/documents/swagger",
    redoc: "/documents/redoc",
    json: "/documents/json",
  });
});

// JSON:
router.use("/json", (req, res) => {
  const jsonPath = path.join(__dirname, "..", "..", "configs", "swagger.json");
  res.type("application/json");
  res.sendFile(jsonPath);
});

// Redoc:
const redoc = require("redoc-express");
router.use(
  "/redoc",
  redoc({
    specUrl: "/documents/json",
    title: "API Docs",
  })
);

// Swagger:
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../configs/swagger.json");

router.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  })
);

module.exports = router;
