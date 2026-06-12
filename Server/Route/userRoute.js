import express from "express";
import userController from "../Controller/userController.js";
import {registerValidation} from "../utills/Validator.js";
const router=express.Router();

router.get("/register",registerValidation,userController.registerUser);

export default router;