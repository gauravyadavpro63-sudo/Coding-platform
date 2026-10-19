import express from "express"
import 'dotenv/config'
import Main from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/userAuth.js"
import redisClient from "./config/reddis.js"
import problemRouter from "./routes/userProblems.js"
import submitRouter from "./routes/userSubmit.js"
import videoRouter from "./routes/userVideo.js"
import cors from "cors"

const app=express();

const allowedOrigins=[
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))


app.use(cookieParser());
app.use(express.json());
app.use("/user",authRouter);
app.use("/problem",problemRouter);
app.use("/submission",submitRouter)
app.use("/video",videoRouter)




const InitalizeConnection=async()=>{
    try{
        await Promise.all([Main(),redisClient.connect()]);
        console.log("data base and reddis connnected");

        const PORT=process.env.PORT||3000
        app.listen(PORT,"0.0.0.0",()=>{
            console.log(`server listening at port ${PORT}`)
        })
    }
    catch(err){
        console.log(err);
    }
}

InitalizeConnection();

