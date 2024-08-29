"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const Category = require("../models/categoryModel");
const Comment = require("../models/commentModel");

// Root path to render the home page
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("categoryId");
    const categories = await Category.find();
    const comments = await Comment.find().populate("blogId");

    res.render("index", { blogs, categories, comments });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// About page
router.get("/about", (req, res) => {
  res.render("about");
});

// Contact page
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Blog post detail page
router.get("/posts/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("categoryId");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "userId"
    );

    if (!blog) {
      return res.status(404).render("404", { message: "Blog post not found" });
    }

    res.render("post", { blog, comments });
  } catch (error) {
    console.error("Error fetching blog details:", error);
    res.status(500).json({ error: "Error fetching blog details" });
  }
});

// Like a blog post
router.post("/posts/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    blog.likes += 1;
    await blog.save();

    res.status(200).json({ likes: blog.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Error updating likes" });
  }
});

// Routes for other resources
router.use("/auth", require("./authRouter"));
router.use("/users", require("./userRouter"));
router.use("/tokens", require("./tokenRouter"));
router.use("/blogs", require("./blogRouter"));
router.use("/categories", require("./categoryRouter"));
router.use("/comments", require("./commentRouter"));
router.use("/documents", require("./document"));

module.exports = router;
