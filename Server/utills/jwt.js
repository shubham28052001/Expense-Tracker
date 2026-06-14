import jwt from "jsonwebtoken";
//function to generate a JWT token for a user

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },//Payload of the token, which includes the user's id, email, and role
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
    );
}

export const generateEmailVerificationToken = (user) => {
    return jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "10m"}
)
};

export const verifyEmailVerificationToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const generateRefreshToken =(user) =>{
    return jwt.sign({
        id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
        expiresIn: process.env.JWT_REFRESH_EXPIRE_IN,
    })
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET);
};