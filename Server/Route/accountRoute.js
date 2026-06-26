import express from "express"
import accountController from "../Controller/accountController.js"
import authMiddleware from "../middleware/authmiddlware.js";


const router = express.Router();

router.post("/create",authMiddleware,accountController.createAccount);
router.get("/getAllaccount",authMiddleware,accountController.getAllaccount);
router.get("/getaccount/:id",authMiddleware,accountController.getAccount);
router.put("/updateAccount/:id",authMiddleware,accountController.updateAccount);
router.delete("/deleteAccount/:id",authMiddleware,accountController.DeleteAccount);
router.patch("/toggle/:id",authMiddleware,accountController.switchActiveAccount  )
export default router;



