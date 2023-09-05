import express from 'express'
import userModel from '../../models/userModel.js';
import { sendOTP } from '../../helpers/sendMail.js';

export const forgotPassword = async(req,res)=>{
    const {email} = req.body.formValue
    try{
       const user = await userModel.findOne({email})
       if(!user){
         res.status(400).json({message:"user does'nt exist"})
       }else{
        const OTP = Math.floor(Math.random() *90000) +10000
            user.otp=OTP
            await user.save();
            await sendOTP(email, OTP)
            res.status(200).json({message:"please verify ur email id"}) 
       }
    }catch(err){
        res.status(500).json({message:"server error"})
    }
}