import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema(
  {
    tenantId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    roomId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Room', 
      required: true 
    },
  },
  { timestamps: true }
)

wishlistSchema.index({ tenantId: 1, roomId: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);