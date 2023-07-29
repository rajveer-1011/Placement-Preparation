const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, college_name, degree, contact_no } = req.body
  if (!name || !email || !college_name || !degree || !contact_no || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await User.create({
    name,
    email,
    college_name,
    degree,
    contact_no,
    password: hashedPassword,

  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      college_name: user.college_name,
      degree: user.degree,
      contact_no: user.contact_no,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Check for user email
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      college_name: user.college_name,
      degree: user.degree,
      contact_no: user.contact_no,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


// @desc    Get all user data
// @route   GET /api/users/all
// @access  Private
const getAll = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})


// @desc    Delete a user
// @route   delete /api/users/
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const admin = await User.findById(req.user.id)
  // Make sure the logged in user is admin
  if (admin.role === "admin") {
    await user.deleteOne();
    res.status(200).json({ id: req.params.id })
  }
  res.status(401)
  throw new Error('You are not an admin')
})


// @desc    Update a user
// @route   put/api/users/
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const admin = await User.findById(req.user.id)
  if (admin.role === "admin") {
    const updateUser = await User.findByIdAndUpdate(user, { role: "coordinator" }, { new: true })
    res.status(200).json(updateUser)
  }
  res.status(401)
  throw new Error('You are not an admin')
})


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  deleteUser,
  updateUser,
}