import mongoose from 'mongoose'

//acts as a receipt

const transactionSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    amount: { type: Number },
    gateway: { type: String, enum: ['esewa', 'khalti'] },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    transactionUUID: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Transaction', transactionSchema)