"use strict";
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("contact", { title: "İletişim" });
});

router.post("/", (req, res) => {
  // Burada form gönderimi işlenebilir
  res.redirect("/contact?message=success");
});

module.exports = router;
