import mongoose from 'mongoose';

//room listing happens here - what the landlord posts

const roomSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    location: {type: String, required: true},
    type:{type:String, enum:['single','shared','apartment']},
    images: [String],
    isAvailable: {type: Boolean, default: true},
    landlordId: {type: String},
  },
  {timestamps:true}
);

roomSchema.index({ isAvailable: 1 })
roomSchema.index({ landlordId: 1 })
roomSchema.index({ price: 1 })
roomSchema.index({ location: 'text' })

export default mongoose.model("Room",roomSchema);