const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel')

//show posts
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

//get single post
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.status(201).json(post)
})

//create post
const createPost = asyncHandler(async (req, res) => {
    const { title, caption, imgUrl, desc } = req.body
    if (!title || !caption || !desc) {
        res.status(400)
        throw new Error('Please add all required fields')
    }
    if (!imgUrl) {
        res.status(400)
        throw new Error('Please add url')
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

    const create = await Post.create({
        title,
        caption,
        imgUrl,
        desc,
        username: req.user.name,
        user: req.user.id,

    })
    res.status(200).json(create)
})

//update post
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
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

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPost)
})



//delete post
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
        res.status(400)
        throw new Error('Post not found')
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

    await post.deleteOne();

    res.status(200).json({ id: req.params.id })

})



//addPostView 
const addPostView = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }
    const user = await User.findById(req.user.id)
    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const updatedPost = await Post.findByIdAndUpdate(postId, {
        $addToSet: { views: req.user.id + " ~ " + req.user.name },
    }, { new: true })

    res.status(200).json(updatedPost)
})


module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPost,
    addPostView,
}