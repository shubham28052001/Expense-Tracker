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
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: function () {
            return this.provider === "local";
        }
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
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    refreshTokens: [
        {
            token: String,
            device: String,
            ip: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    emailVerifiedAt: {
        type: Date,
        default: null
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    providerId: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    },
}, {
    versionKey: false,
    timestamps: true
});


const User = mongoose.model("User", userSchema);
export default User;