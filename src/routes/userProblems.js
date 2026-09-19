import express from "express"
import adminMiddleware from "../middleware/adminMiddleware";

const problemRouter =express.Router();

//create
problemRouter.post("/create",adminMiddleware,createProblem);
//fetch
problemRouter.post("/:id",getProblemById);
//fetchall
problemRouter.get("/",getAllProblem);
//update
problemRouter.patch("/:id",updateProblem);
//delete
problemRouter.delete("/:id",deleteProblem);
//solveproblem
problemRouter.get("/user",solvedAllProblembyUser)


