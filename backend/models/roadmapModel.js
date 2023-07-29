const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    rname: {
      type: String,
      required: true,
    },
    rurl: {
      type: String,
      required: true,
    },
    rdesc: {
      type: String,
      required: true,
    },
    rimgUrl: {
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

module.exports = mongoose.model("Roadmap", PostSchema);