import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
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
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    loginHistory: [
        {
            ip: {
                type: String
            },
            userAgent: {
                type: String
            },
            loginAt: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ["success", "failed"],
                default: "success"
            }
        },
    ],
    preferences: {
        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light"
        },
        language: {
            type: String,
            default: "en"
        }
    }
}, {
    versionKey: false,
    timestamps: true
});


const User = mongoose.model("User", userSchema);
export default User;