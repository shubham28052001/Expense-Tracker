import express from "express";
import userController from "../Controller/userController.js";
import {registerValidation,loginValidation,forgotPasswordValidation,resetPasswordValidation} from "../utills/Validator.js";
import { resendEmailLimiter,loginLimiter,registerLimiter,forgotPasswordLimiter,resetPasswordLimiter } from "../middleware/rateLimitMiddlware.js";
const router=express.Router();

router.post("/register",registerValidation,registerLimiter,userController.registerUser);
router.post("/login",loginValidation,loginLimiter,userController.loginUser);
router.get("/verify-email",userController.verifyEmail);
router.post("/resend-verification",resendEmailLimiter,userController.resendVerificationEmail);
router.post("/forgot-password",forgotPasswordValidation,forgotPasswordLimiter,userController.forgotPassword);
router.post("/reset-password",resetPasswordValidation,resetPasswordLimiter,userController.resetPassword);
export default router;