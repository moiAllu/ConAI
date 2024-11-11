import { validateRoute } from '../helpers';
import { requestForOtpVerificationCode,otpVerification } from '../controllers/optverification.controller';
import { login, signup, update_user, delete_user, logout, forgotPassword, resetPassword, getUser, sendSmtpPostMark } from '../controllers/user.controller';
import express, { Request, Response } from 'express';

const router = express.Router();

// User login route
router.post('/login', login);

// User login route
router.get('/logout', logout);

// User signup route
router.post('/signup', signup);

// User update route with additional verification middleware
router.put('/update', update_user);

// User delete route with additional verification middleware
router.delete('/delete', delete_user);

//User otp request router request route
router.post("/user/otp-request", requestForOtpVerificationCode);

//User otp verification router request route
router.post("/user/otp-verification", otpVerification);

//User forger password router request route
router.post("/user/forgot-password", forgotPassword);

//User reset password router request route
router.post("/user/reset-password/:token", resetPassword);

//get user details
router.get("/me",validateRoute, getUser);

router.get("/postmark", sendSmtpPostMark)

export default router;