import express from "express"

const problemRouter =express.Router();

//create
problemRouter.post("/create",problemCreate);
//fetch
problemRouter.post("/:id",problemFetch);
//fetchall
problemRouter.get("/",getAllProblem);
//update
problemRouter.patch("/:id",problemUpdate);
//delete
problemRouter.delete("/:id",problemDelete);
//solveproblem
problemRouter.get(".user,solveProblem");


