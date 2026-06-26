import express from "express"
import transactionController from "../Controller/transactionController.js"
import authmiddlware from "../middleware/authmiddlware.js"

const router=express.Router();

router.post("/create",authmiddlware,transactionController.createTransaction);
router.get("/transactions",authmiddlware,transactionController.alltransactions);
router.get("/transactions/:id",authmiddlware,transactionController.getTransaction);
router.put("/update/:id",authmiddlware,transactionController.updateTransaction);
router.delete("/delete/:id",authmiddlware,transactionController.deleteTransaction);
router.get("/summary/:accountId",authmiddlware,transactionController.getDashboardSummary);
router.get("/getRecent/:accountId",authmiddlware,transactionController.getRecentTransaction);

export default router;


