const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    cname: {
      type: String,
      required: true,
    },
    curl: {
      type: String,
      required: true,
    },
    cdesc: {
      type: String,
      required: true,
    },
    cimgUrl: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", PostSchema);