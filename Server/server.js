import express from "express";
import http from "http";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoute from "./Route/userRoute.js";
//using dotenv to load environment variables from .env file
dotenv.config();
connectDB();
const app=express();
const PORT = process.env.PORT || 5000;
//using http module to create a server and pass the express app as a callback function
const server=http.createServer(app);
app.use(express.json());

app.use("/api/users", userRoute);
app.get("/",(req,res)=>{
    res.send("Express + HTTP Server is running perfectly!")
});


server.listen(PORT,()=>{
    console.log(`🚀 Server is listening on: http://localhost:${PORT}`);
})

