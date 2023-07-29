const express = require('express')
const { getMsg, createMsg } = require('../controller/messageController')
const { getGroup, createGroup, deleteGroup, get_Group } = require('../controller/groupController')

const router = express.Router()

//protecting route
const {protect} = require('../middleware/authMiddleware')

router.route('/chat/:id').get(protect, getMsg)
router.route('/chat/:id').post(protect, createMsg)
router.route('/').get(protect, getGroup)
router.route('/:id').get(protect, get_Group)
router.route('/').post(protect, createGroup)
router.route('/:id').delete(protect, deleteGroup)


module.exports = router