import bcrypt from "bcryptjs";

// Function to hash a password using bcrypt before saving it to the database
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

// Function to compare a plain text password with a hashed password stored in the database

export const comparePassword = async (password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword);
};