import dotenv from "dotenv"
dotenv.config();
import express from "express";
import http from "http";
import connectDB from "./config/db.js";
import userRoute from "./Route/userRoute.js";
//using dotenv to load environment variables from .env file
connectDB();
const app=express();
const PORT = process.env.PORT || 5000;
//using http module to create a server and pass the express app as a callback function
const server=http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.get("/",(req,res)=>{
    res.send("Express + HTTP Server is running perfectly!")
});

app.post("/test", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

server.listen(PORT,()=>{
    console.log(`🚀 Server is listening on: http://localhost:${PORT}`);
})

