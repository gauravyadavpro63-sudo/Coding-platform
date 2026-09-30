import express from "express"
import {register,login,logout,adminRegister,deleteProfile} from "../controlers/userAuthen.js"
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
//delete profile
authRouter.delete("/profile",userMiddleware,deleteProfile);
//checkauth
authRouter.get("/check",userMiddleware,(req,res)=>{
    const reply={
        firstName:req.result.firstName,
        emailId: req.result.email,
        _id: req.result._id
    }
    res.status(200).json({
        user:reply,
        message:"valid user"
    })

})

export default authRouter