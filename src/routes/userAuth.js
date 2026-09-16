import express from "express"
import {register,login,logout,adminRegister} from "../controlers/userAuthen.js"
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const authRouter=express.Router();

//register
authRouter.post("/register",register);
//login
authRouter.post("/login",login)
// logout
authRouter.post("/logout",userMiddleware,logout)
//admin register
authRouter.post("/admin/register",adminMiddleware,adminRegister);
//getprofile
// authRouter.get("/getprofile",getprofile);



export default authRouter