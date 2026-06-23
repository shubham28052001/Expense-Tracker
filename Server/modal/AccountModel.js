import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        lowercase: true,
    },

    type: {
        type: String,
        enum: ["CURRENT", "SAVING"],
        required: true,
        default: "SAVING",
    },
    initialBalance: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true,
}
)

export default mongoose.model("Account", accountSchema);
