const express = require("express");
const {
  createPost,
  getAllPost,
  deletePost,
  updateVotes,
} = require("../controllers/posts.controller");

const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getAllPost);
router.delete("/:id", auth, deletePost);
router.patch("/votes/:id", auth, updateVotes);

module.exports = router;
