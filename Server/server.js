import express from "express";
import http from "http";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const app=express();
const PORT = process.env.PORT || 5000;

const server=http.createServer(app);

app.get("/",(req,res)=>{
    res.send("Express + HTTP Server is running perfectly!")
});

server.listen(PORT,()=>{
    console.log(`🚀 Server is listening on: http://localhost:${PORT}`);
})

