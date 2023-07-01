const express = require("express");
const {
  createComment,
  getAllComents,
  getSingleComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, createComment);
router.get("/", auth, getAllComents);
router.get("/:id", auth, getSingleComment);
router.patch("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

module.exports = router;
