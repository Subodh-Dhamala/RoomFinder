import mongoose from 'mongoose'
import Wishlist from '../models/Wishlist.js'

export const addToWishlist = async (tenantId, roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw { status: 400, message: 'Invalid room ID' }
  }

  try {
    await Wishlist.create({ tenantId, roomId })
  } catch (error) {
    if (error.code === 11000) {
      throw { status: 400, message: 'Already in wishlist' }
    }
    throw error
  }
}

export const removeFromWishlist = async (tenantId, roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw { status: 400, message: 'Invalid room ID' }
  }

  await Wishlist.findOneAndDelete({ tenantId, roomId })
}

export const getWishlist = async (tenantId) => {
  return await Wishlist.find({ tenantId }).populate('roomId')
}