import mongoose from 'mongoose'
import cloudinary from '../config/cloudinary.js'
import Room from '../models/Room.js'
import AppError from '../utils/AppError.js'

export const createRoom = async (data, landlordId) => {
  const { title, description, price, location, type, images } = data
  return await Room.create({ title, description, price, location, type, images, landlordId });
}

export const getAllRooms = async (query) => {
  const { location, minPrice, maxPrice, type, page, limit } = query

  const filter = { isAvailable: true }

  if (location) filter.location = { $regex: location, $options: 'i' }
  if (type) filter.type = type
  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.$gte = Number(minPrice)
    if (maxPrice) filter.price.$lte = Number(maxPrice)
  }

  const p = Math.max(1, parseInt(page) || 1)
  const l = Math.min(50, parseInt(limit) || 10)

  const rooms = await Room.find(filter)
    .skip((p - 1) * l)
    .limit(l)

  const totalCount = await Room.countDocuments(filter)

  return {
    rooms,
    totalCount,
    currentPage: p,
    totalPages: Math.ceil(totalCount / l),
  }
}

export const getRoomById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid ID', 400)
  }

  const room = await Room.findById(id)
  if (!room) throw new AppError('Room not found', 404)

  return room;
}

export const updateRoom = async (id, data, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid ID', 400)
  }

  const room = await Room.findById(id)
  if (!room) throw new AppError('Room not found', 404)

  if (room.landlordId.toString() !== userId.toString()) {
    throw new AppError('Not your listing', 403)
  }

  //if new images are sent then delete old ones from cloudinary
  if (data.images && data.images.length > 0) {
    for (const image of room.images) {
      try {
        await cloudinary.uploader.destroy(image.public_id)
      } catch (err) {
        console.error('Cloudinary delete failed:', err.message)
      }
    }
  }

  const allowedFields = ['title', 'description', 'price', 'location', 'type', 'images', 'isAvailable']
  const updates = {}
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) updates[field] = data[field]
  })

  return await Room.findByIdAndUpdate(id, updates, { new: true })
}

export const deleteRoom = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid ID', 400)
  }

  const room = await Room.findById(id)
  if (!room) throw new AppError('Room not found', 404)

  if (room.landlordId.toString() !== userId.toString()) {
    throw new AppError('Not your listing', 403)
  }

  //delete all images from cloudinary
  for (const image of room.images) {
    try {
      await cloudinary.uploader.destroy(image.public_id)
    } catch (err) {
      console.error('Cloudinary delete failed:', err.message)
    }
  }

  await room.deleteOne()
}