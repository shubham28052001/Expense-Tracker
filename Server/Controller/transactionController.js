import mongoose from "mongoose";
import transactionModel from "../modal/transactionModel.js";
import AccountModel from "../modal/AccountModel.js";
import { BadRequest, Created, NotFound, ServerError, Success } from "../utills/Status.js";

const createTransaction = async (req, res) => {
    try {
        const {
            accountId,
            type,
            amount,
            category,
            description,
            date,
            isRecurring,
            recurringInterval,
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            return BadRequest(res, "Invalid account id");
        }

        const account = await AccountModel.findOne({
            _id: accountId,
            userId: req.user.id,
            isDeleted: false,
        });
        if (!account) {
            return NotFound(res, "Account not found");
        }

        const transaction = await transactionModel.create({
            userId: req.user.id,
            accountId,
            type,
            amount,
            category: category.trim().toLowerCase(),
            description,
            date,
            isRecurring,
            recurringInterval: isRecurring ? recurringInterval : null,
        });

        return Created(
            res,
            "Transaction created successfully",
            transaction
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const alltransactions = async (req, res) => {
    try {
        const { type, accountId } = req.query;
        const filter = {
            userId: req.user.id,
            isDeleted: false,
        };
        if (type) {
            filter.type = type;
        }

        if (accountId) {
            filter.accountId = accountId;
        }

        const transactions = await transactionModel
            .find(filter)
            .populate("accountId", "name type")
            .sort({ date: -1 });

        return Success(
            res,
            "Transactions fetched successfully",
            transactions
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid transaction id");
        }
        const transaction = await transactionModel
            .findOne({
                _id: id,
                userId: req.user.id,
                isDeleted: false,
            })
            .populate("accountId", "name type");

        if (!transaction) {
            return NotFound(res, "Transaction not found");
        }

        return Success(
            res,
            "Transaction fetched successfully",
            transaction
        );
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, amount, category, description, date, isRecurring, recurringInterval } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid transaction id");
        }
        const transaction = await transactionModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!transaction) {
            return NotFound(res, "Transaction not found");
        }

        if (type) {
            transaction.type = type;
        }

        if (amount !== undefined) {
            transaction.amount = amount;
        }

        if (category) {
            transaction.category = category.trim().toLowerCase();
        }

        if (description !== undefined) {
            transaction.description = description;
        }

        if (date) {
            transaction.date = date;
        }

        if (isRecurring !== undefined) {
            transaction.isRecurring = isRecurring;
        }

        transaction.recurringInterval =
            transaction.isRecurring
                ? recurringInterval || transaction.recurringInterval
                : null;

        await transaction.save();

        return Success(
            res,
            "Transaction updated successfully",
            transaction
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid transaction id");
        }

        const transaction = await transactionModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!transaction) {
            return NotFound(res, "Transaction not found");
        }

        transaction.isDeleted = true;

        await transaction.save();

        return Success(
            res,
            "Transaction deleted successfully"
        );
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getDashboardSummary = async (req, res) => {
    try {
        const { accountId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            return BadRequest(res, "Invalid account id");
        }
        const account = await AccountModel.findOne({
            _id: accountId,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!account) {
            return NotFound(res, "Account not found");
        }

        const summary = await transactionModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                    accountId: new mongoose.Types.ObjectId(accountId),
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);
        let totalIncome = 0;
        let totalExpense = 0;

        summary.forEach((item) => {
            if (item._id === "INCOME") {
                totalIncome = item.total;
            }

            if (item._id === "EXPENSE") {
                totalExpense = item.total;
            }
        });
        const budget = account.initialBalance + totalIncome;
        const currentBalance = budget - totalExpense;
        const usedPercent =budget > 0 ? Number(((totalExpense / budget) * 100).toFixed(2)) : 0;

        return Success(
            res,
            "Dashboard summary fetched successfully",
            {
                accountName: account.name,
                initialBalance: account.initialBalance,
                totalIncome,
                totalExpense,
                currentBalance,
                budget,
                usedPercent
            }
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getRecentTransaction = async (req, res) => {
    try {
        const { accountId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(accountId)) {
            return BadRequest(res, "Invalid account id");
        }

        const transactions = await transactionModel
            .find({
                userId: req.user.id,
                accountId,
                isDeleted: false,
            })
            .sort({ createdAt: -1 })
            .limit(5);

        return Success(
            res,
            "Recent transactions fetched successfully",
            transactions
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

export default { createTransaction, alltransactions, getTransaction, updateTransaction, deleteTransaction, getDashboardSummary, getRecentTransaction };