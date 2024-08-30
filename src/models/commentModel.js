"use strict";
// src\models\commentModel.js
/* -------------------------------------------------------
  | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// Comment Model:

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    comment: { type: String, required: true },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

// Model Oluşturma ve Dışa Aktarma
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
