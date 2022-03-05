const blog = require("../models/blog");

module.exports = {
  createBlog: async (req, res, next) => {
    try {
      const { title, desc, author } = req.body;
      const newBlog = await new blog({
        title,
        desc,
        author,
      });
      await newBlog.save();
      return res
        .status(201)
        .json({
          success: true,
          message: "Blog created successfully",
          response: newBlog,
        });
    } catch (error) {
      console.log("errror", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  getBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const Blog = await blog.findById(id);
      if (!Blog) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Invalid id, Blog not found",
            response: {},
          });
      }
      return res
        .status(200)
        .json({ success: true, message: "Blog found", response: Blog });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  getBlogs: async (req, res, next) => {
    try {
      const Blogs = await blog.find({});
      return res
        .status(200)
        .json({
          success: true,
          message: `${Blogs.length} Blogs found`,
          response: Blogs,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  updateBlog: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { title, desc } = req.body;
      const Blog = await blog.findById(id);
      if (!Blog) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Invalid id, Blog not found",
            response: {},
          });
      }
      if (title) {
        blog.title = title;
      }
      if (desc) {
        blog.desc = desc;
      }

      await blog.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "Blog updated successfully",
          response: Blog,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  deleteBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const Blog = await blog.findByIdAndDelete(id);
      if (!Blog) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Invalid id, Blog not found",
            response: {},
          });
      }

      return res
        .status(200)
        .json({
          success: true,
          message: "Blog deleted successfully",
          response: Blog,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
};
