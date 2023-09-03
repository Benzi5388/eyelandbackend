import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  otp: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '15m'
  },
});

export default mongoose.model('OTP', otpSchema);
