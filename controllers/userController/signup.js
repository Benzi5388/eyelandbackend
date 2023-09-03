import express from 'express'
import userModel from '../../models/userModel.js';
import otpModel from '../../models/otpModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { sendOTP } from '../../helpers/sendMail.js';

export const signup = async (req, res) => {
    const { name, email, password, phone_no } = req.body
    const hashedpswrd = await bcrypt.hash(password, 4)
    try {
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedpswrd,
            phone_no: phone_no
        })
        const OTP = Math.floor(Math.random() *90000) +10000
        await newUser.save()
        const savedotp = new otpModel({
            userId:newUser._id,
            otp:OTP
        })
        const result = await savedotp.save()
        await sendOTP(email, OTP)
        const token = jwt.sign({ id: result._id }, "my_secret_key")
        res.cookie('token', token, {httpOnly:true})
        res.status(200).json({result, token});
    }
    catch (err) {
        res.status(500).json("server error")
    }
}
