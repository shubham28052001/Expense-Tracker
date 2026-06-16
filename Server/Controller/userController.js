import userModel from "../modal/user.js";
import { validationResult } from "express-validator";
import { BadRequest, ServerError, Success, NotFound, Unauthorized } from "../utills/Status.js";
import { hashPassword, comparePassword, verifyGoogleToken } from "../utills/bcrypt.js"
import { generateToken, generateEmailVerificationToken, verifyEmailVerificationToken, generateRefreshToken, verifyRefreshToken } from "../utills/jwt.js";
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

        return Success(res, "User registered successfully");
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
            return Unauthorized(res, "Invalid credentials");
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

        if (user.loginHistory.length > 10) {
            user.loginHistory.shift();
        }
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshTokens.push({
            token: refreshToken,
            device: req.headers["user-agent"],
            ip: req.ip
        });

        if (user.refreshTokens.length > 5) {
            user.refreshTokens.shift();
        }

        const userResponse = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified
        };

        await user.save();
        return Success(res, "User logged in successfully", { user: userResponse, token, refreshToken });
    } catch (error) {
        return ServerError(res, "An error occurred while logging in", error.message);
    }
}

const googleLogin = async (req, res) => {
    try {

        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Google token is required"
            });
        }
        const payload = await verifyGoogleToken(token);
        const { email, name, sub } = payload;
        let user = await userModel.findOne({ email });
        if (user && user.provider === "local") {
            return BadRequest(
                res,
                "This email is already registered with password login"
            );
        }
        if (!user) {
            user = await userModel.create({
                fullName: name,
                email,
                provider: "google",
                providerId: sub,
                isVerified: true,
                emailVerifiedAt: new Date()
            });
        }

        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshTokens.push({
            token: refreshToken,
            device: req.headers["user-agent"],
            ip: req.ip
        });

        await user.save();
        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Google token"
        });
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
            if (err.name === "TokenExpiredError") {
                return BadRequest(res, "Verification token has expired. Please request a new verification email.");
            }
            return BadRequest(res, "Invalid verification token");
        }
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return NotFound(res, "User not found");
        }
        if (user.isVerified) {
            return Success(res, "Email already verified");
        }
        user.isVerified = true;
        user.emailVerifiedAt = new Date();
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
        if (user && user.provider !== "local") {
            return BadRequest(
                res,
                "Password reset is not available for Google accounts"
            );
        }
        if (user) {
            const resetToken = crypto.randomBytes(32).toString("hex");
            user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");;
            user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

            await user.save();
            const resetLink = `${process.env.BACKEND_URL}/api/users/reset-password?token=${resetToken}`;

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
        }

        return Success(res, "If the email exists, a reset link has been sent");

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

        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        user.refreshTokens = [];
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

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return BadRequest(res, "Refresh token is required");
        }

        let decoded;

        try {
            decoded = verifyRefreshToken(refreshToken);
        } catch (err) {
            return Unauthorized(res, "Invalid or expired refresh token");
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return NotFound(res, "User not found");
        }

        const tokenExists = user.refreshTokens.some(
            item => item.token === refreshToken
        );

        if (!tokenExists) {
            return Unauthorized(
                res,
                "Invalid or expired refresh token"
            );
        }

        user.refreshTokens = user.refreshTokens.filter(
            item => item.token !== refreshToken
        );

        const newAccessToken = generateToken(user);
        const newRefreshToken = generateRefreshToken(user);
        user.refreshTokens.push({
            token: newRefreshToken,
            device: req.headers["user-agent"],
            ip: req.ip
        });

        if (user.refreshTokens.length > 5) {
            user.refreshTokens.shift();
        }

        await user.save();
        return Success(
            res,
            "Access token refreshed successfully",
            {
                token: newAccessToken,
                refreshToken: newRefreshToken
            }
        );

    } catch (error) {
        return ServerError(
            res,
            "An error occurred while refreshing token",
            error.message
        );
    }
}

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return BadRequest(res, "Refresh token is required");
        }
        const user = await userModel.findOne({
            "refreshTokens.token": refreshToken
        });
        if (!user) {
            return Unauthorized(res, "Invalid refresh token");
        }
        user.refreshTokens =
            user.refreshTokens.filter(
                item => item.token !== refreshToken
            );

        await user.save();

        return Success(
            res,
            "Logged out successfully"
        );

    } catch (error) {
        return ServerError(res, "An error occurred while logging out", error.message);
    }
}

const logoutAll = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return NotFound(res, "User not found");
        }
        user.refreshTokens = [];
        await user.save();

        return Success(
            res,
            "Logged out from all devices successfully"
        );
    } catch (error) {
        return ServerError(
            res,
            "An error occurred while logging out from all devices",
            error.message
        );
    }
}

export default { registerUser, loginUser, verifyEmail, resendVerificationEmail, forgotPassword, resetPassword, refreshToken, logout, logoutAll, googleLogin };