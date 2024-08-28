"use strict";

/* -------------------------------------------------------
  | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// Blog Model:

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    isPublish: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    countOfVisitors: { type: Number, default: 0 },
  },
  {
    collection: "blogs",
    timestamps: true,
  }
);

// Model Oluşturma ve Dışa Aktarma
const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
