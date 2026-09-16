import jwt from "jsonwebtoken"
import user from "../models/user";

const userMiddleware=async (req,res,next)=>{
    try{
      const {token}=req.cookies;
      if(!token){
        throw new Error("Token is not present");
      }
      const payload=jwt.verify(token,process.env.JWT_KEY)
      const {email}=payload;
      if(!email){
        throw new Error("invalid token")
      }
      const result=await user.findById(email);
      if(!result){
        throw new Error("user dosent exist");
      }

    }
    catch{

    }
}