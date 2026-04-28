import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkId: {type: String, required: false, unique: true},
    email:{type: String, required: true, unique: true},
    name: {type: String},
    role: {type: String, enum:['tenant', 'landlord'], required: false},
  },
  {timestamps: true}
)

export default mongoose.model('User', userSchema);