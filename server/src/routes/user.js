import express from 'express'
import { updateRole } from '../controllers/userController.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.patch('/role', protect, updateRole)

export default router;