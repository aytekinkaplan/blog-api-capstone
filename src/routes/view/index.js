"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const Blog = require("../../models/blogModel");
const User = require("../../models/userModel");

/* ------------------------------------------------------- */
// Ana sayfa ve blog yazıları
router.use("/", require("./blogPageRouter"));

// Hakkımızda sayfası
router.use("/about", require("./aboutRouter"));

// İletişim sayfası
router.use("/contact", require("./contactRouter"));

// Kategoriler sayfası
router.use("/categories", require("./categoryRouter"));

// Yazarlar sayfası
router.get("/authors", async (req, res) => {
  try {
    const authors = await User.find({ isAuthor: true });
    res.render("authors", { title: "Yazarlar", authors });
  } catch (error) {
    res
      .status(500)
      .render("error", {
        title: "Hata",
        message: "Yazarlar yüklenirken bir hata oluştu",
      });
  }
});

// Arşiv sayfası
router.get("/archive", async (req, res) => {
  try {
    const archives = await Blog.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);
    res.render("archive", { title: "Arşiv", archives });
  } catch (error) {
    res
      .status(500)
      .render("error", {
        title: "Hata",
        message: "Arşiv yüklenirken bir hata oluştu",
      });
  }
});

// Arama sayfası
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.render("search", { title: "Arama", results: [] });
    }
    const results = await Blog.find({ $text: { $search: query } }).limit(10);
    res.render("search", { title: "Arama Sonuçları", results, query });
  } catch (error) {
    res
      .status(500)
      .render("error", {
        title: "Hata",
        message: "Arama yapılırken bir hata oluştu",
      });
  }
});

// Kullanıcı profili sayfası
router.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  try {
    const user = await User.findById(req.user._id);
    res.render("profile", { title: "Profil", user });
  } catch (error) {
    res
      .status(500)
      .render("error", {
        title: "Hata",
        message: "Profil bilgileri yüklenirken bir hata oluştu",
      });
  }
});

// Gizlilik politikası sayfası
router.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy", { title: "Gizlilik Politikası" });
});

// Kullanım koşulları sayfası
router.get("/terms-of-service", (req, res) => {
  res.render("terms-of-service", { title: "Kullanım Koşulları" });
});

// 404 - Sayfa Bulunamadı
router.use((req, res) => {
  res.status(404).render("404", { title: "Sayfa Bulunamadı" });
});

/* ------------------------------------------------------- */
module.exports = router;
