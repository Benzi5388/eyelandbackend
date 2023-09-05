import express from 'express'
import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt'


export const resetPassword = async (req, res)=>{
    const {otp, password, confirmpassword} = req.body.formValue
    try{
       const user = await userModel.findOne({otp})
       if(!user){
        res.status(400).json({message:"Invalid OTP"})
       }
       else if(password===confirmpassword){
      const hashedPassword = await bcrypt.hash(password, 4);
      user.password = hashedPassword;
      delete user.otp;
      await user.save();
      res.status(200).json({message: "ur password have been reset"})
       }else{
        res.status(400).json({message:"passwords dnt match"})
       }
    }catch(err){
        res.status(500).json({message:"server error"})
    }
}