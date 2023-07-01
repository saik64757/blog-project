const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
      trim: true,
    },

    description: {
      type: String,
      require: [true, "description is required"],
      trim: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    votes: {
      upVotes: {
        type: Number,
        default: 0,
        required: true,
      },
      downVotes: {
        type: Number,
        default: 0,
        required: true,
      },
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;
