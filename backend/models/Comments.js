const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "comment is required"],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: mongoose.Types.ObjectId,
  postUserId: mongoose.Types.ObjectId,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
