import jwt from "jsonwebtoken";

//function to generate a JWT token for a user

export const generateToken = (user) => {
    return jwt.sign(
        {id: user._id,
            email: user.email,
            role: user.role
        },//Payload of the token, which includes the user's id, email, and role
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE_IN}
    );
}