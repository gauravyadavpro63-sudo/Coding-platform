import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { saveVideo,uploadSignature,getVideo } from "../controlers/videoControllers.js";

const videoRouter=express.Router();

videoRouter.post("/signature",adminMiddleware,uploadSignature)

videoRouter.post("/savevideo",adminMiddleware,saveVideo);

videoRouter.get("/getvideo/:id",getVideo);





export default videoRouter