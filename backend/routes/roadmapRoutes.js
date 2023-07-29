const express = require('express')
const { getRoadmap,
    createRoadmap,
    updateRoadmap,
    deleteRoadmap, } = require('../controller/roadmapController')
const router = express.Router()

//protecting route
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRoadmap).post(protect, createRoadmap)

router.route('/:id').put(protect, updateRoadmap).delete(protect, deleteRoadmap)


module.exports = router