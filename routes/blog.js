const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id/:index", deleteBlog);
router.get("/", getBlogs);

module.exports = router;
