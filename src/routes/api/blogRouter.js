"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/blog:

const blog = require("../controllers/blogController");
const permissions = require("../../middlewares/permissions");

// URL: /blogs

router.use(permissions.isAdmin);

router.route("/").get(blog.list).post(blog.create);

router
  .route("/:id")
  .get(blog.read)
  .put(blog.update)
  .patch(blog.update)
  .delete(blog.delete);

/* ------------------------------------------------------- */
// Exports:
module.exports = router;
