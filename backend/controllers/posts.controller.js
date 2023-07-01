const Posts = require("../models/Posts");
const User = require("../models/User");
const Comment = require("../models/Comments");
const { findOne } = require("../models/Posts");

const createPost = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id: userId } = req.user;

    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json("All fiels required in post");
    }
    // const file = `${process.env.BASE_URL}/${req.file.filename}`;

    let post = new Posts({
      title,
      description,
      user: userId,
    });

    post = await post.save();
    res.status(201).json({ post });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Posts.find()
      .populate("user", "username email")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "-password",
        },
      })
      .sort({ createdAt: -1 });

    if (!posts) {
      return res.status(404).json("Posts not found");
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id)
      .populate("user", "username email")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "-password",
        },
      });

    if (!post) {
      return res.status(404).json("Posts not found with thsi id");
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deletePost = async (req, res, next) => {
  console.log(req);
  try {
    const post = await Posts.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!post) {
      return res.status(404).json("Posts not found with this id");
    }

    // const comment = await Comment.findOne({ _id: { $in: post.comments } });

    // if (!comment) {
    //   return res.status(404).json("Comment not found with this id");
    // }
    // await Comment.deleteMany({ _id: { $in: post.comments } });

    res.status(200).json({
      message: "Post deleted",
      newPost: {
        ...post,
        user: req.user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getSinglePost,
  deletePost,
};
