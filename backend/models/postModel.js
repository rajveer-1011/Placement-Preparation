const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    views: {
      type: [String],
      default: [],
    },
    username: {
      type: String,
      required: false,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);