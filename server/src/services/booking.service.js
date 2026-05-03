import mongoose from 'mongoose'
import Booking from '../models/Booking.js'
import Room from '../models/Room.js'

export const createBooking = async (roomId, message, tenantId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw { status: 400, message: 'Invalid room ID' }
  }

  //atomic update — prevents double booking
  const room = await Room.findOneAndUpdate(
    { _id: roomId, isAvailable: true },
    { $set: { isAvailable: false } },
    { new: true }
  )

  if (!room) throw { status: 400, message: 'Room is already booked!' }

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
    throw { status: 400, message: 'Invalid booking ID' }
  }

  if (!['accepted', 'rejected'].includes(status)) {
    throw { status: 400, message: 'Invalid status' }
  }

  const booking = await Booking.findById(bookingId)
  if (!booking) throw { status: 404, message: 'Booking not found' }

  if (booking.landlordId.toString() !== landlordId.toString()) {
    throw { status: 403, message: 'Not your booking' }
  }

  // if accepted then atomic update to prevent race condition
  if (status === 'accepted') {
    const room = await Room.findOneAndUpdate(
      { _id: booking.roomId, isAvailable: true },
      { $set: { isAvailable: false } },
      { new: true }
    )
    if (!room) throw { status: 400, message: 'Room already booked' }
  }

  // if rejected then make room available again
  if (status === 'rejected') {
    await Room.findByIdAndUpdate(booking.roomId, { $set: { isAvailable: true } })
  }

  booking.status = status;
  await booking.save();

  return booking;
}