const express = require("express");
const router = express.Router();

const {
  createPara,
  updatePara,
  deletePara,
  getParas,
  getCommentsOnPara,
  commentOnPara,
  deleteComment
} = require("../controllers/para");

//paragraph routes
router.post("/", createPara);
router.get("/", getParas);

router.put("/:id", updatePara);
router.delete("/:id/:index", deletePara);

//comment routes

router.get("/:ParaId", getCommentsOnPara);
router.post("/comment/:paraId", commentOnPara);
router.delete("/comment/:comId", deleteComment);

module.exports = router;
