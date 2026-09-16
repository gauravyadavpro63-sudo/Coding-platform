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
      await User.create(req.body);

      const token=jwt.sign({email},process.env.JWT_KEY,{expiresIn:3600})
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
        const match=await bcrypt.compare(passward,user.passward);
        if(!match){
            throw new Error("invalid credentials");
        }
        else{
        const token=jwt.sign({email},process.env.JWT_KEY,{expiresIn:3600})
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
  //validate the token
  //tokken add kar denge redis ke block list me
  //cookies ko clear kar denge
  }
  catch(err){
   
  }

}




export {register,login,logout}