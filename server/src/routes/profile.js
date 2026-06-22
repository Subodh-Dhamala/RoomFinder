import express from 'express'
import {
  getProfile,
  updateProfile,
  updateAvatar,
  getPublicProfile
} from '../controllers/profileController.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', protect, getProfile)
router.patch('/', protect, updateProfile)
router.patch('/avatar', protect, updateAvatar)
router.get('/:id', getPublicProfile)

export default router;