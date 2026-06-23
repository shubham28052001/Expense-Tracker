import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: ["INCOME", "EXPENSE"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    description: {
        type: String,
        trim: true,
        default: "",
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isRecurring: {
        type: Boolean,
        default: false,
    },
    recurringInterval: {
        type: String,
        enum: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
        default: null,
    },
},
    {
        timestamps: true,
        versionKey: false,
    }
)

export default mongoose.model("Transaction", transactionSchema);