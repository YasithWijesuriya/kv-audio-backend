import express from "express";
import bodyParser from "body-parser";
import  mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors";
import orderRouter from "./routes/orderRouter.js";




dotenv.config();

const app = express();

app.use(cors(
    /*{
        origin: ["http://localhost:3000"],
    }*/
));

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header
    ("Authorization");

  

    if (token != null){
        token = token.replace("Bearer ","");

        jwt.verify(token, process.env.JWT_SECRET,
            (err,decoded)=>{
                if(!err){
                    req.User = decoded;
                }
            }
        );
    }
    next()
})
 
const mongoUrl = process.env.MONGO_URL;  

mongoose.connect(mongoUrl)
const connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB database connection established");
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/inquiries",inquiryRouter);
app.use("/api/orders",orderRouter)


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

