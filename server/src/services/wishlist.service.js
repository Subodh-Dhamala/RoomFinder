import mongoose from 'mongoose'
import Wishlist from '../models/Wishlist.js'
import AppError from '../utils/AppError.js'

export const addToWishlist = async (tenantId, roomId) => {
  const cleanRoomId = roomId?.toString().trim();

  if (!mongoose.Types.ObjectId.isValid(cleanRoomId)) {
    throw new AppError('Invalid room ID', 400);
  }

  try {
    const result = await Wishlist.create({ 
      tenantId: new mongoose.Types.ObjectId(tenantId), 
      roomId: new mongoose.Types.ObjectId(cleanRoomId) 
    });
    return result;
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error('Already in wishlist');
      (duplicateError).statusCode = 400;
      throw duplicateError;
    }
    throw error;
  }
}

export const removeFromWishlist = async (tenantId, roomId) => {
  const cleanRoomId = roomId?.toString().trim();

  if (!mongoose.Types.ObjectId.isValid(cleanRoomId)) {
    throw new AppError('Invalid room ID', 400);
  }

  await Wishlist.findOneAndDelete({ 
    tenantId: new mongoose.Types.ObjectId(tenantId), 
    roomId: new mongoose.Types.ObjectId(cleanRoomId) 
  });
}

export const getWishlist = async (tenantId) => {
  return await Wishlist.find({ tenantId: new mongoose.Types.ObjectId(tenantId) })
    .populate('roomId')
    .lean();
}