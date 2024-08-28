"use strcit";

/* -------------------------------------------------------
  | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
// Category Model:

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

// Model Oluşturma ve Dışa Aktarma
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
