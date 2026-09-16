import jwt from "jsonwebtoken"
import user from "../models/user.js";
import redisClient from "../config/reddis.js"
const adminMiddleware=async (req,res,next)=>{
    try{
      const {token}=req.cookies;
      if(!token){
        throw new Error("Token is not present");
      }
      const payload=jwt.verify(token,process.env.JWT_KEY)
      if(payload.role!="admin"){
        throw new Error("Invalid Token")
      }
      const {email}=payload;
      if(!email){
        throw new Error("invalid token")
      }
      const result=await user.findOne({email});
      if(!result){
        throw new Error("user dosent exist");
      }
      //cheak blocklist

      const isBlocked=await redisClient.exists(`token:${token}`);
      if(isBlocked){
        throw new Error("invalid Token");
      }
      req.result=result
      next();

    }
    catch(err){
        res.send(err.message);
    }
}

export default  adminMiddleware