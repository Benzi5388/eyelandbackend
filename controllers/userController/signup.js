import express from 'express'
import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt'

import { sendOTP } from '../../helpers/sendMail.js';

export const signup = async (req, res) => {
    const { username, email, password, phone } = req.body.formValue
    console.log(req.body.formValue);
    const hashedpswrd = await bcrypt.hash(password, 4)
    try {
        const oldUser = await userModel.findOne({email})
        if(oldUser){
            res.status(400).json({message: "already registered, Please sign in"});
        }
        const OTP = Math.floor(Math.random() *90000) +10000
        const newUser = new userModel({
            name: username,
            email: email,
            password: hashedpswrd,
            phone_no: phone,
            otp: OTP
        })
        
        await newUser.save()
        
        await sendOTP(email, OTP)
        
        res.status(200).json({newUser});
    }
    catch (err) {
        res.status(500).json("server error")
    }
}
