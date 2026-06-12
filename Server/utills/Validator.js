import validator from "express-validator";
const {body}=validator;

export const registerValidation=[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
]