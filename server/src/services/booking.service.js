import mongoose from 'mongoose'
import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import AppError from '../utils/AppError.js'

export const createBooking = async (roomId, message, tenantId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new AppError('Invalid room ID', 400)
  }

  // Atomically lock the room for the tenant
  const room = await Room.findOneAndUpdate(
    { _id: roomId, isAvailable: true },
    { $set: { isAvailable: false } },
    { new: true }
  )

  if (!room) throw new AppError('Room is already booked!', 400)

  const booking = await Booking.create({
    tenantId,
    landlordId: room.landlordId,
    roomId,
    message,
  })

  return await booking.populate('roomId')
}

export const getMyBookings = async (tenantId) => {
  return await Booking.find({ tenantId })
    .populate('roomId')
    .sort({ createdAt: -1 })
}

export const getIncomingBookings = async (landlordId) => {
  return await Booking.find({ landlordId })
    .populate('roomId')
    .populate('tenantId', 'name email avatar phone bio social')
    .sort({ createdAt: -1 })
}

export const updateBookingStatus = async (bookingId, status, userId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new AppError('Invalid booking ID', 400)
  }

  if (!['accepted', 'rejected'].includes(status)) {
    throw new AppError('Invalid status', 400)
  }

  const booking = await Booking.findById(bookingId)
  if (!booking) throw new AppError('Booking not found', 404)

  if (booking.status !== 'pending') {
    throw new AppError('This booking has already been decided', 400)
  }

  // Validate Authorization
  if (booking.landlordId.toString() !== userId.toString()) {
    throw new AppError('Not your booking', 403)
  }

  const targetRoomId = booking.roomId

  if (status === 'accepted') {
    await Room.findByIdAndUpdate(targetRoomId, { $set: { isAvailable: false } })
  }

  if (status === 'rejected') {
    await Room.findByIdAndUpdate(targetRoomId, { $set: { isAvailable: true } })
  }

  booking.status = status;
  await booking.save();

  return await booking.populate('roomId')
}