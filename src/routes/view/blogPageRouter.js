const express = require("express");
const router = express.Router();
const Blog = require("../../models/blogModel");
const Category = require("../../models/categoryModel");

router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find()
      .populate("userId")
      .populate("categoryId")
      .sort("-createdAt")
      .limit(10);
    const categories = await Category.find();
    res.render("index", {
      title: "Ana Sayfa",
      posts,
      categories,
    });
  } catch (error) {
    res.status(500).render("error", { message: "Bir hata oluştu" });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
      .populate("userId")
      .populate("categoryId");
    if (!post) {
      return res.status(404).render("error", { message: "Yazı bulunamadı" });
    }
    res.render("post", {
      title: post.title,
      post,
    });
  } catch (error) {
    res.status(500).render("error", { message: "Bir hata oluştu" });
  }
});

module.exports = router;
