"use strict";
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  isPublish: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  countOfVisitors: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
