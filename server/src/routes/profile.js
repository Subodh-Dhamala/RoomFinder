import express from 'express'
import {
  getProfile,
  updateProfile,
  updateAvatar,
} from '../controllers/profileController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, getProfile)
router.patch('/', protect, updateProfile)
router.patch('/avatar', protect, updateAvatar)

export default router;