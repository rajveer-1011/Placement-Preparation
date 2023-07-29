const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        group_name: {
            type: String,
            required: true,
        },
        restriction: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Group", Schema);