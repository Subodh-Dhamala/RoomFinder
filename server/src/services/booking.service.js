import mongoose from 'mongoose'
import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import AppError from '../utils/AppError.js'

export const createBooking = async (roomId, message, tenantId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new AppError('Invalid room ID', 400)
  }

  //atomic update — prevents double booking
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
  return await Booking.find({ landlordId }).populate('roomId');
}

export const updateBookingStatus = async (bookingId, status, landlordId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new AppError('Invalid booking ID', 400)
  }

  if (!['accepted', 'rejected'].includes(status)) {
    throw new AppError('Invalid status', 400)
  }

  const booking = await Booking.findById(bookingId)
  if (!booking) throw new AppError('Booking not found', 404)

  if (booking.landlordId.toString() !== landlordId.toString()) {
    throw new AppError('Not your booking', 403)
  }

  // if accepted then atomic update to prevent race condition
  if (status === 'accepted') {
    const room = await Room.findOneAndUpdate(
      { _id: booking.roomId, isAvailable: true },
      { $set: { isAvailable: false } },
      { new: true }
    )
    if (!room) throw new AppError('Room already booked', 400)
  }

  // if rejected then make room available again
  if (status === 'rejected') {
    await Room.findByIdAndUpdate(booking.roomId, { $set: { isAvailable: true } })
  }

  booking.status = status;
  await booking.save();

  return booking;
}