import dotenv from "dotenv"
dotenv.config();
import express from "express";
import http from "http";
import connectDB from "./config/db.js";
import userRoute from "./Route/userRoute.js";
import accountRoute from "./Route/accountRoute.js"
import transactionRoute from "./Route/transactionRoute.js"
import budgetRoute from "./Route/budgetRoute.js"
import cors from "cors"
//using dotenv to load environment variables from .env file
connectDB();
const app=express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
const PORT = process.env.PORT || 5000;
//using http module to create a server and pass the express app as a callback function
const server=http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/account",accountRoute);
app.use("/api/transaction",transactionRoute);
app.use("/api/budget",budgetRoute);
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

