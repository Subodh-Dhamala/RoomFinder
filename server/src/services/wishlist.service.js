import mongoose from 'mongoose'
import Wishlist from '../models/Wishlist.js'
import AppError from '../utils/AppError.js'

export const addToWishlist = async (tenantId, roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new AppError('Invalid room ID', 400)
  }

  try {
    await Wishlist.create({ tenantId, roomId })
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('Already in wishlist', 400)
    }
    throw error
  }
}

export const removeFromWishlist = async (tenantId, roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new AppError('Invalid room ID', 400)
  }

  await Wishlist.findOneAndDelete({ tenantId, roomId })
}

export const getWishlist = async (tenantId) => {
  return await Wishlist.find({ tenantId })
    .populate('roomId')
    .lean()
}