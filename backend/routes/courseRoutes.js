const express = require('express')
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controller/courseController')
const router = express.Router()

//protecting route
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getCourses).post(protect,createCourse)

router.route('/:id').put(protect,updateCourse).delete(protect,deleteCourse)


module.exports = router