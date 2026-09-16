import express from "express"
const authRouter=express.Router();
import {register,login,logout} from "../controlers/userAuthen.js"


//register
authRouter.post("/register",register);
//login
authRouter.post("/login",login)
// logout
authRouter.post("/logout",logout)
//getprofile
// authRouter.get("/getprofile",getprofile);



export default authRouter