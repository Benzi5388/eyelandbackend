import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

process.env.DOTENV_CONFIG_PATH = '../../backend/.env';
dotenv.config();

export function sendOTP(email, otp) {
    console.log(email, otp, "helpers");
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Eyeland Email verification",
            html: `
              <h1>Verify Your Email For Eyeland</h1>
                <h3>use this code to verify your email</h3>
                <h2>${otp}</h2>
              `,
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error)
            } else {
                resolve({ success: true, message: "Email sent successfull" })
                console.log("email sent successfully");
            }
        });
    })
}
