const express = require('express')
const { getPosts, createPost, deletePost, updatePost, getPost, addPostView } = require('../controller/postController')
const router = express.Router()

//protecting route
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getPosts).post(protect,createPost)

router.route('/:id').put(protect,updatePost).delete(protect,deletePost)

router.get('/:id', protect,getPost)

//add view to post
router.get('/view/:id', protect, addPostView)


module.exports = router