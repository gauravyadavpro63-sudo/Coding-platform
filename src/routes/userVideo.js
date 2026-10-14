import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { saveVideo,getVideos } from "../controlers/videoControllers.js";

const videoRouter=express.Router();

videoRouter.post("/",adminMiddleware,saveVideo);

videoRouter.get("/",getVideos);



export default videoRouter