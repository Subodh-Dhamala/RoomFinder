import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema(
  {
    tenantId: {type:String},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
  },
  {timestamps: true}
)

wishlistSchema.index({tenantId: 1, roomId:1}, {unique: true});

export default mongoose.model('Wishlist',wishlistSchema);
