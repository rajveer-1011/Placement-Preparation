const express = require('express')
const { getPapers,
    createPaper,
    deletePaper,
} = require('../controller/paperController')
const router = express.Router()

//protecting route
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPapers).post(protect, createPaper)

router.route('/:id').delete(protect, deletePaper)

module.exports = router