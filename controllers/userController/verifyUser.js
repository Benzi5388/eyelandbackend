import express from 'express'
import userModel from '../../models/userModel.js'

export const verifyUser = async (req, res) => {
   const { otp } = req.body.formValue
   try {
      const user = await userModel.findOne({ otp: otp })
      if (!user) {
         res.status(400).json({ message: "Invalid Otp" })
      } else {
         user.isVerified = true
         user.otp = undefined;
         await user.save();
         res.status(200).json({ message: "OTP verified successfully" })
      }
   } catch (err) {
      res.status(500).json({ message: "server error" })
      console.log("error");
   }
}