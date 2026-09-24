
import redisClient from "../config/reddis.js";

const submitRateLimiter=async(req,res,next)=>{
    try{
      const userId= req.result._id.toString();
      const key=`rate_limit:submit:${userId}`;
      const request=await redisClient.incr(key);
      if(request===1){
        await redisClient.expire(key,60);
      }
      if(request>5){
        return res.status(429).send("too many req ,try again later")
      }
      next();
    }
    catch(err){
      
         res.status(500).send(err);
    }
}

export default submitRateLimiter