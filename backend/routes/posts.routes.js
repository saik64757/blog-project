const express = require("express");
const {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
} = require("../controllers/posts.controller");

const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getAllPost);
router.get("/:id", auth, getSinglePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
