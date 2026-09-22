import express from "express"
import { submitCode } from "../controlers/userSubmission";
const submitRouter=express.Router();


import userMiddleware from "../middleware/userMiddleware";


submitRouter.post("submit/:id",userMiddleware,submitCode);



export default submitRouter