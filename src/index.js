import express from "express"
import 'dotenv/config'
import Main from "./config/db.js"
import cookieParser from "cookie-parser"
import user from "./models/user.js"

const app=express()
app.use(cookieParser());
app.use(express.json());






Main()
.then(async ()=>{
    app.listen(process.env.PORT,()=>{
    console.log("listening at port "+process.env.PORT)
})
})
.catch(()=>{
    console.log("error occured ");
})

