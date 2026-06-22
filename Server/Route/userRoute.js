import express from "express";
import userController from "../Controller/userController.js";
import { registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation } from "../utills/Validator.js";
import { resendEmailLimiter, loginLimiter, registerLimiter, forgotPasswordLimiter, resetPasswordLimiter, refreshLimiter } from "../middleware/rateLimitMiddlware.js";
import authMiddleware from "../middleware/authmiddlware.js";
import {chatWithAI} from "../Controller/GeminiController.js"
const router = express.Router();

router.post("/register", registerValidation, registerLimiter, userController.registerUser);
router.post("/login", loginValidation, loginLimiter, userController.loginUser);
router.post("/google-login", userController.googleLogin);
router.get("/verify-email", userController.verifyEmail);
router.post("/resend-verification", resendEmailLimiter, userController.resendVerificationEmail);
router.post("/forgot-password", forgotPasswordValidation, forgotPasswordLimiter, userController.forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPasswordLimiter, userController.resetPassword);
router.post("/refresh-token", refreshLimiter, userController.refreshToken);
router.post("/logout", userController.logout);
router.post("logoutAll",authMiddleware,userController.logoutAll);
router.get("/profile",authMiddleware,userController.getProfile);
router.post("/chat",chatWithAI);
export default router;
