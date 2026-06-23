import { BadRequest, Created, NotFound, ServerError, Success } from "../utills/Status.js";
import BudgetModel from "../modal/BudgetModel.js";
import AccountModel from "../modal/AccountModel.js";
import mongoose from "mongoose";

const createBudget = async (req, res) => {
    try {
        const {
            accountId,
            category,
            amount,
            month,
            year,
            alertPercentage,
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

        const existingBudget = await BudgetModel.findOne({
            userId: req.user.id,
            accountId,
            category: category.trim().toLowerCase(),
            month,
            year,
            isDeleted: false,
        });

        if (existingBudget) {
            return BadRequest(
                res,
                "Budget already exists for this category and month"
            );
        }

        const budget = await BudgetModel.create({
            userId: req.user.id,
            accountId,
            category: category.trim().toLowerCase(),
            amount,
            month,
            year,
            alertPercentage,
        });

        return Created(
            res,
            "Budget created successfully",
            budget
        );
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getAllBudgets = async (req, res) => {
    try {
        const { accountId } = req.query;
        const filter = {
            userId: req.user.id,
            isDeleted: false,
        };

        if (accountId) {
            if (!mongoose.Types.ObjectId.isValid(accountId)) {
                return BadRequest(res, "Invalid account id");
            }

            filter.accountId = accountId;
        }
        const budgets = await BudgetModel.find(filter)
            .populate("accountId", "name type")
            .sort({ createdAt: -1 });
        return Success(
            res,
            "Budgets fetched successfully",
            budgets
        );
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getBudget = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid budget id");
        }

        const budget = await BudgetModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        }).populate("accountId", "name type");

        if (!budget) {
            return NotFound(res, "Budget not found");
        }

        return Success(
            res,
            "Budget fetched successfully",
            budget
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, alertPercentage, isActive, } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid budget id");
        }

        const budget = await BudgetModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!budget) {
            return NotFound(res, "Budget not found");
        }

        if (amount !== undefined) {
            budget.amount = amount;
        }

        if (alertPercentage !== undefined) {
            budget.alertPercentage = alertPercentage;
        }

        if (isActive !== undefined) {
            budget.isActive = isActive;
        }

        await budget.save();
        return Success(
            res,
            "Budget updated successfully",
            budget
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid budget id");
        }
        const budget = await BudgetModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!budget) {
            return NotFound(res, "Budget not found");
        }
        budget.isDeleted = true;
        await budget.save();

        return Success(
            res,
            "Budget deleted successfully"
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getBudgetUsage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid budget id");
        }

        const budget = await BudgetModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!budget) {
            return NotFound(res, "Budget not found");
        }

        const startDate = new Date(
            budget.year,
            budget.month - 1,
            1
        );

        const endDate = new Date(
            budget.year,
            budget.month,
            1
        );

        const result = await transactionModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                    accountId: budget.accountId,
                    category: budget.category,
                    type: "EXPENSE",
                    isDeleted: false,
                    date: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSpent: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        const spent =
            result.length > 0
                ? result[0].totalSpent
                : 0;

        const remaining = budget.amount - spent;

        const usedPercentage =
            budget.amount > 0
                ? Number(
                    ((spent / budget.amount) * 100).toFixed(2)
                )
                : 0;

        const isAlertReached =
            usedPercentage >= budget.alertPercentage;

        return Success(
            res,
            "Budget usage fetched successfully",
            {
                category: budget.category,
                budget: budget.amount,
                spent,
                remaining,
                usedPercentage,
                alertPercentage: budget.alertPercentage,
                isAlertReached,
            }
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}












export default { createBudget, getAllBudgets, getBudget, updateBudget, deleteBudget, getBudgetUsage };