import express from 'express'
import {
  createBooking,
  getMyBookings,
  getIncomingBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js'
import { protect } from '../middlewares/auth.js'
import requireRole from '../middlewares/requireRole.js'

const router = express.Router()

router.post('/', protect, requireRole('tenant'), createBooking)
router.get('/mine', protect, requireRole('tenant'), getMyBookings)
router.get('/incoming', protect, requireRole('landlord'), getIncomingBookings)
router.patch('/:id/status', protect, requireRole('landlord'), updateBookingStatus)

export default router