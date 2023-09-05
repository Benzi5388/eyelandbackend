import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true
   },
   email:{
    type: String,
    required: true
   },
   password:{
    type: String,
    required: true
   },
   phone_no: {
    type: Number,
    required:true
   },
   isVerified :{
    type:Boolean,
    default:false
   },
   otp: {
      type: Number,
      default: Date.now,
      expires: '15m'
    }
})

export default mongoose.model('user', userSchema)