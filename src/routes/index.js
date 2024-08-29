"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const Category = require("../models/categoryModel");
const Comment = require("../models/commentModel"); // Modeli içe aktarma

// Root path to render the home page:
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("categoryId");
    const categories = await Category.find();
    const comments = await Comment.find().populate("blogId"); // Modeli kullanma

    res.render("index", { blogs, categories, comments });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// URL: /

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
