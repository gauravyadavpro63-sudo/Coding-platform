import redisClient from "../config/reddis.js";
import User from "../models/user.js";
import validate from "../utils/validators.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//register
const register=async (req,res)=>{
    try{

      validate(req.body);
      const {firstName,email,passward}=req.body;
      req.body.passward=await bcrypt.hash(passward,10)
      req.body.role="user";
      await User.create(req.body);

      const token=jwt.sign({email:email,role:"user"},process.env.JWT_KEY,{expiresIn:3600})
      res.cookie("token",token,{maxAge:60*60*1000})
      res.status(201).send("user created succefullly");
    }
    catch(err){
     res.status(400).send("error "+err )
    }
}

//login
const login=async(req,res)=>{
    try{
        const {email,passward}=req.body;

        if(!email){
            throw new Error("invalid credentials");
        }
        if(!passward){
            throw new Error("invalid credentials");
        }
        const user=await User.findOne({email});
        if (!user) {
       throw new Error("invalid credentials");
                   }
        const match=await bcrypt.compare(passward,user.passward);
        if(!match){
            throw new Error("invalid credentials");
        }
        else{
        const token=jwt.sign({email:email,role:user.role},process.env.JWT_KEY,{expiresIn:3600})
        res.cookie("token",token,{maxAge:60*60*1000})
        res.status(200).send("logged in succesfully")
        }
    }
    catch(err){
       res.status(401).send("error "+err);
    }
}


//logout
const logout=async(req,res)=>{

  try{
  
  //add token in reddis blocklist
  const {token}=req.cookies;
  const payload=jwt.decode(token);

  await redisClient.set(`token:${token}`,'Blocked');
  await redisClient.expireAt(`token:${token}`,payload.exp);

//clear cookies
res.clearCookie("token");
res.send("logged out succesfully");
  }
  catch(err){
   res.status(503).send(err.message);
  }

}


//admin register
const adminRegister=async(req,res)=>{
        try{

      validate(req.body);
      const {firstName,email,passward}=req.body;
      req.body.passward=await bcrypt.hash(passward,10)
      req.body.role="admin";
      await User.create(req.body);

      const token=jwt.sign({email:email,role:"admin"},process.env.JWT_KEY,{expiresIn:3600})
      res.cookie("token",token,{maxAge:60*60*1000})
      res.status(201).send("user created succefullly");
    }
    catch(err){
     res.status(400).send("error "+err )
    }
}



export {register,login,logout,adminRegister}