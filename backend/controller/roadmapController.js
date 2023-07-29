const asyncHandler = require('express-async-handler')
const Roadmap = require('../models/roadmapModel')
const User = require('../models/userModel')

// Get Roadmap
const getRoadmap = asyncHandler(async (req, res) => {
    const roadmaps = await Roadmap.find()
    res.status(200).json(roadmaps)
})


// Create Roadmap
const createRoadmap = asyncHandler(async (req, res) => {
    const { rname, rurl, rimgUrl, rdesc } = req.body
    if (!rname || !rurl || !rdesc) {
        res.status(400)
        throw new Error('Please add all required fields')
    }
    // User
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
    // Create roadmap
    const create = await Roadmap.create({
        rname,
        rurl,
        rimgUrl,
        rdesc,
        username: req.user.name,
        user: req.user.id,

    })
    res.status(200).json(create)
})


// Update Course
const updateRoadmap = asyncHandler(async (req, res) => {
    const roadmap = await Roadmap.findById(req.params.id)

    if (!roadmap) {
        res.status(400)
        throw new Error('Roadmap not found')
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
    console.log(req.body);
    console.log(req.params.id);

    const updatedRoadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedRoadmap)
})


// Delete Roadmap
const deleteRoadmap = asyncHandler(async (req, res) => {
    const roadmap = await Roadmap.findById(req.params.id)
    if (!roadmap) {
        res.status(400)
        throw new Error('Roadmap not found')
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
    await roadmap.deleteOne();
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getRoadmap,
    createRoadmap,
    updateRoadmap,
    deleteRoadmap,
}