const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    college_name : {
      type: String,
      required: [true, 'Please add a college name'],
    },
    degree :{
      type: String,
      required: [true, 'Please add a college name'],
    },
    contact_no :{
      type: String,
      required: [true, 'Please add a college name'],
    },
    role: {
      type: String,
      enum: ["admin", "user", "coordinator"],
      default:"user",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
