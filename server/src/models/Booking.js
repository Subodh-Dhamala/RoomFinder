// provides booking structure for tenant, tenant sees the room posted by landlord via this structure.
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {

    tenantId: {type: String},
    landlordId: {type: String},
    roomId:{ type: mongoose.Schema.Types.ObjectId, ref:'Room'},
    status:{
      type:String,
      enum: ['pending','accepted','rejected'],
      default: 'pending',
    },
    message: {type: String},
    isPaid: {type:Boolean, default: false},
  },
  {timestamps:true}
)
