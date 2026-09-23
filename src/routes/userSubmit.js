import express from "express"
import { submitCode,runCode } from "../controlers/userSubmission.js";
import userMiddleware from "../middleware/userMiddleware.js";

const submitRouter=express.Router();






submitRouter.post("/submit/:id",userMiddleware,submitCode);

submitRouter.post("/runcode/:id",userMiddleware,runCode);


export default submitRouter