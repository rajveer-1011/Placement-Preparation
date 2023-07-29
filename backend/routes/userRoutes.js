const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getAll,
  deleteUser,
  updateUser,
} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', protect, getAll)
router.route('/:id').get(protect,updateUser).delete(protect,deleteUser)



module.exports = router
