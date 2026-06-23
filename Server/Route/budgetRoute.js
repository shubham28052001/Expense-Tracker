import express, { Router } from "express";
import BudgetController from "../Controller/BudgetController.js";
import authmiddlware from "../middleware/authmiddlware.js";

const router=express.Router();

router.post("/create",authmiddlware,BudgetController.createBudget);
router.get("/getAllBudgets",authmiddlware,BudgetController.getAllBudgets);
router.get("/getBudget/:id",authmiddlware,BudgetController.getBudget);
router.put("/updateBudget/:id",authmiddlware,BudgetController.updateBudget);
router.delete("/deleteBudget/:id",authmiddlware,BudgetController.deleteBudget);
router.get("/getBudgetUsage/:id",authmiddlware,BudgetController.getBudgetUsage);
router.get("/expense-by-category/:accountId",authmiddlware,BudgetController.expensebycategory);
router.get("/monthly-overview/:accountId",authmiddlware,BudgetController.monthlyoverview);
export default router;