import express from 'express'
const router = express.Router()

import { signup } from '../controllers/userController/signup.js';
import { verifyUser } from '../controllers/userController/verifyUser.js';
import { signin } from '../controllers/userController/signin.js';
import { forgotPassword } from '../controllers/userController/forgotPassword.js';
import { resetPassword } from '../controllers/userController/resetPassword.js';
import userAuth from '../middlewares/userAuth.js';

router.post('/signup', signup)
router.post('/verifyotp', verifyUser)
router.post('/signin', signin)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword', resetPassword)

export default router;