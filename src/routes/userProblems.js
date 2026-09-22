import express from "express"
import adminMiddleware from "../middleware/adminMiddleware.js";
import {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem} from "../controlers/userProblem.js";
import userMiddleware from "../middleware/userMiddleware.js";
const problemRouter =express.Router();

//create
problemRouter.post("/create",adminMiddleware,createProblem);
//fetch
problemRouter.post("/problemById/:id",userMiddleware,getProblemById);
//fetchall
problemRouter.get("/getAllProblem",userMiddleware,getAllProblem);
//update
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
//delete
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);
//solveproblem
// problemRouter.get("problemSolvedByUser",userMiddleware,solvedAllProblembyUser)


export default problemRouter