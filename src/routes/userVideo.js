import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { saveVideo,getVideos,uploadSignature } from "../controlers/videoControllers.js";

const videoRouter=express.Router();

videoRouter.post("/signature",adminMiddleware,uploadSignature)

videoRouter.post("/saveVideo",adminMiddleware,saveVideo);

videoRouter.get("/fetchVideos",getVideos);



export default videoRouter