import express from "express"
import 'dotenv/config'
import Main from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/userAuth.js"
import redisClient from "./config/reddis.js"
import problemRouter from "./routes/userProblems.js"

const app=express();
app.use(cookieParser());
app.use(express.json());
app.use("/user",authRouter);
app.use("/problem",problemRouter);




const InitalizeConnection=async()=>{
    try{
        await Promise.all([Main(),redisClient.connect()]);
        console.log("data base and reddis connnected");

        app.listen(process.env.PORT,()=>{
            console.log("server listening at port 3000")
        })
    }
    catch(err){
        console.log(err);
    }
}

InitalizeConnection();

