import express from 'express'
const router = express.Router()

import { signup } from '../controllers/userController/signup.js';
import { verifyUser } from '../controllers/userController/verifyUser.js';

router.post('/signup', signup)
router.post('/verifyotp', verifyUser)

export default router;