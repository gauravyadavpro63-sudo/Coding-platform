import express from "express"
import { submitCode,runCode } from "../controlers/userSubmission.js";
import userMiddleware from "../middleware/userMiddleware.js";
import submitRateLimiter from "../middleware/rateLimiter.js";

const submitRouter=express.Router();






submitRouter.post("/submit/:id",userMiddleware,submitRateLimiter,submitCode);

submitRouter.post("/runcode/:id",userMiddleware,runCode);


export default submitRouter