"use strict";
// src\routes\views\index.js
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use("/auth", require("./authRouter"));
// user:
router.use("/users", require("./userRouter"));
// token:
router.use("/tokens", require("./tokenRouter"));

// blog:
router.use("/blogs", require("./blogRouter"));
// category:
router.use("/categories", require("./categoryRouter"));

// comment:
router.use("/comments", require("./commentRouter"));

// document:
router.use("/documents", require("./document"));

/* ------------------------------------------------------- */
module.exports = router;
