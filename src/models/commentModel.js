"use strict";
/* -------------------------------------------------------
  | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// Blog Model:
const CommentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
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
