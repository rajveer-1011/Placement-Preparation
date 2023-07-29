const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')
const User = require('../models/userModel')

//get group msgs
const getMsg = asyncHandler(async (req, res) => {
    const msg = req.params.id
    const msgs = await Message.find({"group_Id":msg})
    res.status(201).json(msgs)
})

//create msg
const createMsg = asyncHandler(async (req, res) => {
    const { input } = req.body
    const group_Id = req.params.id
    if (!input) {
        res.status(400)
        throw new Error('Please add required fields')
    }
    const user = await User.findById(req.user.id)
    
    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    const create = await Message.create({
        group_Id,
        text:input,
        sender_name: req.user.name,
        user: req.user.id,
    })
    res.status(200).json(create)
})


module.exports = {
    getMsg,
    createMsg,
}