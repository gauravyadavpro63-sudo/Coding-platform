import axiosClient from "../utils/axiosClient";



async function Fetchallproblem(page=1){

 
        const response=await axiosClient.get(`/problem/getAllProblem?page=${page}`)
        return response.data
      
}


async function FetchSolvedProblem(){
        const response=await axiosClient.get("/problem/problemSolvedByUser")
        return response.data
}


export {Fetchallproblem,FetchSolvedProblem}