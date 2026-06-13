import validator from "express-validator";
const {body}=validator;

export const registerValidation=[
    body("fullName").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
]

export const loginValidation=[
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password").notEmpty().withMessage("Password is required")
];

export const forgotPasswordValidation=[
    body("email").isEmail().withMessage("Please provide a valid email address")
];

export const resetPasswordValidation=[
    body("newPassword").isLength({min:6}).withMessage("Password must be at least 6 characters long")
];