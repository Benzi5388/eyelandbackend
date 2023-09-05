import express from 'express'
import bcrypt from 'bcrypt';
import userModel from '../../models/userModel.js';
import { sendOTP } from '../../helpers/sendMail.js';
import jwt from 'jsonwebtoken';

export const signin = async(req,res)=>{
     const {email, password} = req.body.formValue
     try{
        const user = await userModel.findOne({email})
        console.log(user);
        if(!user){
            res.status(400).json({message: "Email id is not registered"})
        }else if(user.isVerified===false){
            const OTP = Math.floor(Math.random() *90000) +10000
            user.otp=OTP
            await user.save();
            await sendOTP(user.email, OTP)
            res.status(200).json({message:"please verify ur email id", user}) 
        }else{
           const matchPassword = await bcrypt.compare(password, user.password)
           if(matchPassword){
            const token = jwt.sign({ id: user._id }, "my_secret_key")
            res.cookie('token', token, {httpOnly:true})
            res.status(200).json({message: "login successful", token, user})
           }else{
            res.status(400).json({message: "Invalid credentials"})
           }
        }
     }
     catch(err){

     }
}