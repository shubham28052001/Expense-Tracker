import rateLimit from "express-rate-limit";

export const resendEmailLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 1,
    message: {
        success: false,
        message: "Please wait 1 minute before requesting another verification email"
    }
});

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10, 
    message: {
        success: false,
        message: "Too many login attempts. Try again after 10 minutes"
    }
});

export const registerLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5,
    message: {
        success: false,
        message: "Too many accounts created. Try again after 10 minutes"
    }
});

export const forgotPasswordLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10, 
    message: {
        success: false,
        message: "Too many password reset attempts. Try again after 10 minutes"
    }
});

export const resetPasswordLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5,
    message: {
        success: false,
        message: "Too many attempts. Please try again later"
    }
});

export const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: {
        success: false,
        message: "Too many refresh requests. Please try again later."
    }
});