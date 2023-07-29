const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')
const User = require('../models/userModel')

// Show courses
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find()
    res.status(200).json(courses)
})


// Create course
const createCourse = asyncHandler(async (req, res) => {
    const { cname, curl , cimgUrl, cdesc } = req.body
    if (!cname || !curl || !cdesc) {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    const user = await User.findById(req.user.id)
    
    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user is admin
    if (user.role === "user") {
        res.status(401)
        throw new Error('You are not an admin')
    }

    const create = await Course.create({
        cname,
        curl,
        cimgUrl,
        cdesc,
        username: req.user.name,
        user: req.user.id,

    })
    res.status(200).json(create)
})


// Update Course
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    const user = await User.findById(req.user.id)
    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user is admin
    if (user.role === "user") {
        res.status(401)
        throw new Error('You are not an admin')
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedCourse)
})


// Delete Course
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    const user = await User.findById(req.user.id)
    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user is admin
    if ( user.role === "user") {
        res.status(401)
        throw new Error('You are not an admin')
    }

    await course.deleteOne();
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
}