const para = require("../models/para");
const Comment = require("../models/comment");

module.exports = {
  createPara: async (req, res, next) => {
    try {
      const { text, blogId } = req.body;
      let index;

      const paras = await para.find({});

      if (paras.length === 0) {
        index = 1;
      }

      if (paras[paras.length - 1] && paras[paras.length - 1].index) {
        index = paras[paras.length - 1].index + 1;
      }

      const newpara = await new para({
        text,
        index,
        blogId,
      });
      await newpara.save();
      return res.status(201).json({
        success: true,
        message: "para created successfully",
        response: newpara,
      });
    } catch (error) {
      console.log("errror", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updatePara: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { text, index, blogId } = req.body;
      const para = await para.findById(id);
      if (!para) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, Paragraph not found",
          response: {},
        });
      }
      if (text) {
        para.text = text;
      }
      if (index) {
        para.index = index;
      }

      if (blogId) {
        para.blogId = blogId;
      }

      await para.save();
      return res.status(200).json({
        success: true,
        message: "Paragraph updated successfully",
        response: para,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deletePara: async (req, res, next) => {
    try {
      const { id, index } = req.params;
      // const paraToDel = await para.find({index});
      const paras = await para.find({});

      let i = paras[paras.length - 1].index;
      while (i < index - 1) {
        let para = paras[i];
        para.index = para.index - 1;
        console.log("para", para);
        // para.save()
      }

      const paraOne = await para.findByIdAndDelete(id);

      if (!paraOne) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, Para not found",
          response: {},
        });
      }

      return res.status(200).json({
        success: true,
        message: "Paragraph deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getParas: async (req, res, next) => {
    try {
      const Blogs = await para.find({});
      return res.status(200).json({
        success: true,
        message: `${Blogs.length} Paras found`,
        response: Blogs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  commentOnPara: async (req, res, next) => {
    try {
      const {ParaId } = req.params;
      const { comment } = req.body;
      const isExist = await Comment.findOne({
        $and: [{ paraId: ParaId }, { comment }],
      });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "Comment already exist",
          response: {},
        });
      }
      const newComment = await new Comment({
        comment,
        paraId:ParaId,
      });
      await newComment.save();
      return res.status(200).json({
        success: false,
        message: "Commented successfully",
        response: newComment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getCommentsOnPara: async (req, res, next) => {
    try {
      const { ParaId } = req.params;
      const comments = await Comment.find({ paraId:ParaId });
      return res.status(200).json({
        success: true,
        message: `${comments.length} comments on given post`,
        response: comments,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const { comId } = req.params;
      const comment = await Comment.findByIdAndDelete(comId);
      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
