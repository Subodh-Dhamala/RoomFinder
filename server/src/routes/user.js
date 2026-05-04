import express from 'express'
import { updateRole } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.patch('/role', protect, updateRole)

export default router;