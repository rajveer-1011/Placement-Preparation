const asyncHandler = require('express-async-handler')
const Group = require('../models/groupModel')
const User = require('../models/userModel')

//get groups
const getGroup = asyncHandler(async (req, res) => {
    const groups = await Group.find()
    res.status(201).json(groups)
})

//get group
const get_Group = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id)
    res.status(201).json(group)
})

//create group
const createGroup = asyncHandler(async (req, res) => {
    const { group_name, restriction } = req.body
    if (!group_name) {
        res.status(400)
        throw new Error('Please add required fields')
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

    const create = await Group.create({
        group_name,
        restriction,
    })
    res.status(200).json(create)
})


//Delete Group
const deleteGroup = asyncHandler(async (req, res) => {

    const group = await Group.findById(req.params.id)
    if (!group) {
        res.status(400)
        throw new Error('group not found')
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

    await group.deleteOne();

    res.status(200).json({ id: req.params.id })

})

module.exports = {
    getGroup,
    get_Group,
    createGroup,
    deleteGroup,
}