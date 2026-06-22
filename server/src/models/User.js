import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    role: { type: String, enum: ['tenant', 'landlord'], default: null },
    avatar: {
      url: { type: String },
      public_id: { type: String },
    },
    bio: { type: String },
    phone: { type: String },
    social: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      linkedin: {type: String},
      website : {type: String},
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)