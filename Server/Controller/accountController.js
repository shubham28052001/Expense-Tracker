
import AccountModel from "../modal/AccountModel.js";
import { BadRequest, Created, ServerError, Success, NotFound } from "../utills/Status.js"
import mongoose from "mongoose";

const createAccount = async (req, res) => {
    try {
        const { name, type, initialBalance } = req.body;

        const existingAccount = await AccountModel.findOne({
            userId: req.user.id,
            name: name.trim().toLowerCase(),
            type
        });

        if (existingAccount) {
            return BadRequest(res, "Account already exists")
        }

        const hasAccount = await AccountModel.exists({
            userId: req.user.id,
            isDeleted: false,
        });

        const account = await AccountModel.create({
            userId: req.user.id,
            name: name.trim().toLowerCase(),
            type,
            initialBalance,
            isActive: !hasAccount,
        });

        return Created(res, "Account created successfully", account);

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getAllaccount = async (req, res) => {
    try {
        const accounts = await AccountModel.find({
            userId: req.user.id,
            isDeleted: false,
        }).sort({ createdAt: -1 });
        return Success(
            res,
            "Accounts fetched successfully",
            accounts
        );
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getAccount = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid account id");
        }

        const account = await AccountModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        })

        if (!account) {
            return NotFound(res, "Account not found");
        }

        return Success(
            res,
            "Account fetched successfully",
            account
        );
    } catch (error) {
        console.log(error.message);
        return ServerError(res, error.message);
    }
}

const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid account id");
        }
        const account = await AccountModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!account) {
            return NotFound(res, "Account not found");
        }

        const duplicateAccount = await AccountModel.findOne({
            _id: { $ne: id },
            userId: req.user.id,
            name: name.trim().toLowerCase(),
            type,
        });

        if (duplicateAccount) {
            return BadRequest(res, "Account already exists");
        }

        account.name = name.trim().toLowerCase();
        account.type = type;
        await account.save();

        return Success(
            res,
            "Account updated successfully",
            account
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
}

const DeleteAccount = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid account id");
        }

        const account = await AccountModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!account) {
            return NotFound(res, "Account not found");
        }
        const totalAccounts = await AccountModel.countDocuments({
            userId: req.user.id,
            isDeleted: false,
        });

        if (totalAccounts === 1) {
            return BadRequest(
                res,
                "You must have at least one account"
            );
        }

        if (account.isActive) {
            return BadRequest(
                res,
                "Active account cannot be deleted. Please switch to another account first."
            );
        }

        account.isDeleted = true;
        await account.save();

        return Success(
            res,
            "Account deleted successfully"
        );
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const switchActiveAccount = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return BadRequest(res, "Invalid account id");
        }
        const account = await AccountModel.findOne({
            _id: id,
            userId: req.user.id,
            isDeleted: false,
        });

        if (!account) {
            return NotFound(res, "Account not found");
        }

        if (account.isActive) {
            return Success(
                res,
                "Account is already active",
                account
            );
        }

        await AccountModel.updateMany(
            {
                userId: req.user.id,
                isDeleted: false,
            },
            {
                $set: { isActive: false },
            }
        );

        account.isActive = true;
        await account.save();

        return Success(
            res,
            "Account switched successfully",
            account
        );

    } catch (error) {
        return ServerError(res, error.message);
    }
};









export default { createAccount, getAllaccount, getAccount, updateAccount, DeleteAccount, switchActiveAccount };