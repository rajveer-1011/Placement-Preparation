const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        group_Id: {
            type: String,
            required: true,
        },
        sender_name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", Schema);