import express from "express"
const authRouter=express.Router();


//register
authRouter.post("/register",register);
//login
authRouter.post("/login",login)
//logout
authRouter.post("/logout",logout)
//getprofile
authRouter.get("/getprofile",getprofile);
