"use strict";
// src\routes\views\authRouter.js
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const auth = require("../../controllers/views/authController");

// URL: /auth

router.post("/login", auth.login);
router.post("/refresh", auth.refresh);
router.get("/logout", auth.logout);

/* ------------------------------------------------------- */
module.exports = router;
