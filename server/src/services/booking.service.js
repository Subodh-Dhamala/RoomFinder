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

  return await Booking.create({
    tenantId,
    landlordId: room.landlordId,
    roomId,
    message,
  });
}

export const getMyBookings = async (tenantId) => {
  return await Booking.find({ tenantId }).populate('roomId')
}

export const getIncomingBookings = async (landlordId) => {
  return await Booking.find({ landlordId })
    .populate('roomId')
    .populate('tenantId', 'name email avatar phone bio social')
}

export const updateBookingStatus = async (bookingId, status, userId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new AppError('Invalid booking ID', 400)
  }

  if (!['accepted', 'rejected', 'cancelled'].includes(status)) {
    throw new AppError('Invalid status', 400)
  }

  const booking = await Booking.findById(bookingId)
  if (!booking) throw new AppError('Booking not found', 404)

  // Validate Authorization
  if (status === 'cancelled') {
    if (booking.tenantId.toString() !== userId.toString()) {
      throw new AppError('Not your booking to cancel', 403)
    }
  } else {
    if (booking.landlordId.toString() !== userId.toString()) {
      throw new AppError('Not your booking', 403)
    }
  }

  const targetRoomId = booking.roomId._id ? booking.roomId._id : booking.roomId

  // FIX: Accept logic updated to avoid "isAvailable: true" check
  if (status === 'accepted') {
    await Room.findByIdAndUpdate(targetRoomId, { $set: { isAvailable: false } })
  }

  // If rejected/cancelled, unlock the room
  if (status === 'rejected' || status === 'cancelled') {
    await Room.findByIdAndUpdate(targetRoomId, { $set: { isAvailable: true } })
  }

  booking.status = status;
  await booking.save();

  return booking;
}