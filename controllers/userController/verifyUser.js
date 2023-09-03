import express from 'express'
import otpModel from '../../models/otpModel.js'
import userModel from '../../models/userModel.js'

export const verifyUser = async (req, res) => {
    const { otp } = req.body
    try {
      const savedotp = await otpModel.findOne({otp : otp})
      if(!savedotp){
        res.status(400).json({message: "Invalid Otp"})
      } else{
         const user = await userModel.findById(savedotp.userId)
         if(!user){
            res.status(400).json({message:"no user found"})
         }else{
            user.isVerified = true
            await user.save();
            res.status(200).json({message: "OTP verified successfully"})
         }  
      }  
    } catch (err) {
        res.status(500).json({ message: "server error" })
        console.log("error");
    }

}