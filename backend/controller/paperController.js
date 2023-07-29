const asyncHandler = require('express-async-handler')
const Papers = require('../models/paperModel')
const User = require('../models/userModel')

// Show Papers
const getPapers = asyncHandler(async (req, res) => {
    const papers = await Papers.find()
    res.status(200).json(papers)
})


// Create Papers
const createPaper = asyncHandler(async (req, res) => {
    const { pname, purl } = req.body
    if (!pname || !purl ) {
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
    if (user.role === "coordinator" || user.role === "user") {
        res.status(401)
        throw new Error('You are not an admin')
    }

    const create = await Papers.create({
        pname,
        purl,
        username: req.user.name,
        user: req.user.id,
    })
    res.status(200).json(create)
})

// Delete paper
const deletePaper = asyncHandler(async (req, res) => {
    const paper = await Papers.findById(req.params.id)

    if (!paper) {
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

    await paper.deleteOne();
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPapers,
    createPaper,
    deletePaper,
}