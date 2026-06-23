import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },

    year: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    alertPercentage: {
        type: Number,
        default: 80,
        min: 1,
        max: 100,
    },

},
    {
        timestamps: true,
        versionKey: false,
    }
)

budgetSchema.index({
    userId: 1,
    accountId: 1,
    category: 1,
    month: 1,
    year: 1,
});

export default mongoose.model("Budget", budgetSchema);