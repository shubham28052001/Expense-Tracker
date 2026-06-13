import userModel from "../modal/user.js";
import { validationResult } from "express-validator";
import { BadRequest, ServerError, Success, NotFound, Unauthorized } from "../utills/Status.js";
import { hashPassword, comparePassword } from "../utills/bcrypt.js"
import { generateToken, generateEmailVerificationToken, verifyEmailVerificationToken } from "../utills/jwt.js";
import transporter from "../config/mail.js";
import crypto from "crypto";

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return BadRequest(res, "Validation failed", errors.array());
        }
        // Check if user already exists
        const ExistingUser = await userModel.findOne({ email });
        if (ExistingUser) {
            return BadRequest(res, "User already exists with this email");
          
        }

        //hash PAssword
        const hashed = await hashPassword(password);
        // Create new user
        const newUser = await userModel.create({
            fullName: fullName,
            email: email,
            password: hashed,
            isVerified: false
        });

        const emailToken = generateEmailVerificationToken(newUser);

        const verificationLink = `${process.env.BACKEND_URL}/api/users/verify-email?token=${emailToken}`;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: newUser.email,
            subject: "Welcome to Expense Tracker",
            html: `Hello ${fullName},
            Thank you for registering on our Expense Tracker app! We're excited to have you on board.
            Please click on the link below to verify your email:
            <a href="${verificationLink}">Verify Email</a>
            Best regards,
            The Expense Tracker Team`
        });

        return Success(res, "User registered successfully", newUser);
    } catch (error) {
        return ServerError(res, "An error occurred while registering the user", error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return BadRequest(res, "Validation failed", errors.array());
        }
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return NotFound(res, "User not found with this email");
        }

        //check if password is correct
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return Unauthorized(res, "Invalid credentials");
        }

        //check if user is verified
        if (!user.isVerified) {
            return Unauthorized(res, "User is not verified. Please verify your email.");
        }

        // Add login history
        user.loginHistory.push({
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            status: "success"
        });
        const token = generateToken(user);
        await user.save();
        return Success(res, "User logged in successfully", { user, token });
    } catch (error) {
        return ServerError(res, "An error occurred while logging in", error.message);
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return BadRequest(res, "Verification token is missing");
        }
        let decoded;
        try {
            decoded = verifyEmailVerificationToken(token);
        } catch (err) {
            if (err.name === "jwt expired") {
                return BadRequest(res, "Verification token has expired. Please request a new verification email.");
            }
            return BadRequest(res, "Invalid verification token");
        }
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return NotFound(res, "User not found");
        }
        if (user.isVerified) {
            return Success(res, "User is already verified");
        }
        user.isVerified = true;
        await user.save();

        return Success(res, "Email verified successfully");
    } catch (error) {
        return ServerError(res, "An error occurred while verifying email", error.message);
    }
}

const resendVerificationEmail = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return NotFound(res, "User not found with this email");
        }
        if (user.isVerified) {
            return BadRequest(res, "User is already verified");
        }

        const emailToken = generateEmailVerificationToken(user);
        const verificationLink = `${process.env.BACKEND_URL}/api/users/verify-email?token=${emailToken}`;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Resend Verification Email - Expense Tracker",
            html: `Hello ${user.fullName},
            We received a request to resend the verification email for your Expense Tracker account. 
            Please click on the link below to verify your email:
            <a href="${verificationLink}">Verify Email</a>`
        });
        return Success(res, "Verification email resent successfully");

    } catch (error) {
        return ServerError(res, "An error occurred while resending verification email", error.message);
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return BadRequest(res, "Validation failed", errors.array());
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return NotFound(res, "please provide a registered email address");
        }

        const generateResetToken = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = crypto.createHash("sha256").update(generateResetToken).digest("hex");;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min

        await user.save();

        const resetLink = `${process.env.BACKEND_URL}/api/users/reset-password?token=${generateResetToken}`;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <h3>Hello ${user.fullName}</h3>
                <p>You requested a password reset</p>
                <a href="${resetLink}">Reset Password</a>
                <p>This link will expire in 10 minutes</p>
            `
        });
        return Success(res, "Password reset email sent successfully");

    } catch (error) {
        return ServerError(res, "An error occurred while processing forgot password request", error.message);
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;

        if (!token || !newPassword) {
            return BadRequest(res, "Missing required fields");
        }
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const user = await userModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return BadRequest(res, "Invalid or expired reset token");
        }
        const hashed = await hashPassword(newPassword);

        user.password = hashed;

        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        return Success(res, "Password reset successfully");

    } catch (error) {
        return ServerError(
            res,
            "An error occurred while processing reset password request",
            error.message
        );
    }
};

export default { registerUser, loginUser, verifyEmail, resendVerificationEmail, forgotPassword, resetPassword };