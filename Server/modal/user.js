import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        }
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    _id: false
});

const mainSchema = new mongoose.Schema({
    user: [userSchema]
});

const User = mongoose.model("User", mainSchema);
export default User;