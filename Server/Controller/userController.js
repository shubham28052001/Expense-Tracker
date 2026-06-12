import userModel from "../Model/userModel.js";
import {validationResult} from "express-validator";
import {BadRequest,ServerError, Success} from "../utills/Status.js";
import {hashPassword} from "../utills/bcrypt.js"
const registerUser=async(req,res)=>{
    try{
    const {fullName,email,password}=req.body;
    // Check for validation errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return BadRequest(res, "Validation failed", errors.array());
    }
    // Check if user already exists
    const ExistingUser=await userModel.findOne({email});
    if(ExistingUser){
        return BadRequest(res, "User already exists with this email");
    }

    //hash PAssword
    const hashed= await hashPassword(password);
    // Create new user
    const newUser=await userModel.create({
       fullName:fullName,
       email:email,
       password:hashed
    });

    return Success(res, "User registered successfully", newUser);
    }catch(error){
       return ServerError(res, "An error occurred while registering the user", error.message); 
    }
}