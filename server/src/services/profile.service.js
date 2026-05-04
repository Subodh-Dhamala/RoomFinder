import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';
import Room from '../models/Booking.js';
import { updateProfileSchema } from "../validations/profile.validation.js"
import AppError from "../utils/AppError.js"

export const getProfile = async (userId, role)=>{
  const user = await User.findById(userId).select('-__v').lean();
  if(!user) throw new AppError('User not found',404);

  let data;
  if(role === 'landlord'){
    data = await Room.find({landlordId: userId}).sort({createdAt: -1}).lean();
  }

  else if(role === 'tentant'){
    data = await Booking.find({tenantId : userId})
    .populate('roomId','title price location images')
    .sort({createdAt: -1})
    .lean()
  }

  else{
    throw new AppError('Invalid role',400);
  }

  return {user,data};

}

export const updateProfile = async (userId,updates) =>{
  const allowedFields = ['name','bio','phone','social'];

  const result = updateProfileSchema.safeParse(updates);

 if (!result.success) {
    throw new AppError(result.error.errors[0].message, 400)
  }

  const validatedData = result.data

  const data = {}
  for (const key of allowedFields) {
    if (validatedData[key] !== undefined) data[key] = validatedData[key]
  }

  if (!Object.keys(data).length) {
    throw new AppError('No valid fields provided', 400)
  }

  const updated = await User.findByIdAndUpdate(userId, data, { new: true })
    .select('-__v')
    .lean();

  if (!updated) throw new AppError('User not found', 404)

  return updated;

}

export const updateAvatar = async (userId, avatar) =>{
  const user = await User.findById(userId);
  if(!user) throw new Error('User not found', 404);

  const oldPublicId = user.avatar?.public_id;

  const updated  = user.findByIdAndUpdate(userID, {avatar}, {new:true})
  .select('-__v')
  .lean()

  if(!updated) throw new AppError('User not found',404);
   if (oldPublicId) {
    try {
      await cloudinary.uploader.destroy(oldPublicId)
    } catch (err) {
      console.error('Cloudinary cleanup failed:', err.message)
    }
  }
 
  return updated;
}
