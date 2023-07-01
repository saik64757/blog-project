const Posts = require("../models/Posts");
const User = require("../models/User");
const Comment = require("../models/Comments");

const createComment = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const { content, postId, postUserId } = req.body;

    if (!content) {
      return res.status(400).json("Comment text is required");
    }

    const post = await Posts.findById(postId);
    if (!post) return res.status(400).json("This post does not exist.");

    const newComment = new Comment({
      content,
      user: userId,
      postUserId: userId,
      postId,
    });

    await Posts.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    const comment = await newComment.save();

    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllComents = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const comments = await Comment.find().populate("user", "username email");
    if (!comments) {
      return res.status(404).json("Comments not found with this blog");
    }

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getSingleComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (!comment) {
      return res.status(404).json("Comments not found with this id");
    }

    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!comment) {
      return res.status(404).json("Not found");
    }

    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      $or: [{ user: req.user.id }, { postUserId: req.user.id }],
    });

    if (!comment) {
      return res.status(404).json("Not found");
    }

    res.status(200).json("Comment deleted");
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createComment,
  getAllComents,
  getSingleComment,
  updateComment,
  deleteComment,
};
